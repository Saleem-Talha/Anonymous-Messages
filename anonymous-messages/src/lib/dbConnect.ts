// Importing the 'mongoose' library, which is used for interacting with MongoDB databases in Node.js.
import mongoose from "mongoose";

// Defining a TypeScript type 'ConnectionObject' to represent the structure of the connection object.
// The 'isConnected' property is optional and represents the connection status (e.g., 1 for connected).
type ConnectionObject = {
    isConnected?: number; // The '?' indicates that the 'isConnected' property is optional.
}

// Creating an instance of 'ConnectionObject' to keep track of the database connection status.
const connection: ConnectionObject = {}

// Asynchronous function to establish a connection to the MongoDB database.
async function dbConnect(): Promise<void> {
    // If the connection is already established, log a message and return early.
    if (connection.isConnected) {
        console.log("Already connected to Database");
        return; // Exit the function to avoid reconnecting.
    }

    try {
        // Attempt to connect to the MongoDB database using the URI from environment variables.
        // The 'process.env.MONGODB_URI' is expected to contain the MongoDB connection string.
        const db = await mongoose.connect(process.env.MONGODB_URI || "", {})

        // Store the connection status in the 'connection' object.
        // The 'readyState' property indicates the current state of the connection (e.g., 1 for connected).
        connection.isConnected = db.connections[0].readyState;

        // Log a success message if the connection is established.
        console.log("Connected to Database Successfully");
    } catch (error) {
        // Log an error message if the connection attempt fails.
        console.log("Database Connection Failed", error);
        
        // Exit the process with a failure code (1) to indicate that the connection failed.
        process.exit(1);
    }
}

// Exporting the 'dbConnect' function as the default export of this module.
// This allows other parts of the application to import and use this function to connect to the database.
export default dbConnect;
