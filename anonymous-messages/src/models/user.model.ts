// Importing necessary modules from the 'mongoose' library.
import mongoose, { Schema, Document } from 'mongoose';

// Define an interface 'Message' that extends the Mongoose 'Document' interface.
// This interface represents the structure of a message document in MongoDB.
export interface Message extends Document {
    content: string;   // The content of the message as a string.
    createdAt: Date;   // The date and time when the message was created.
}

// Define the schema for the 'Message' document, specifying the structure of the message data.
const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,          // 'content' is a string type field.
        required: true         // The 'content' field is mandatory.
    },
    createdAt: {
        type: Date,            // 'createdAt' is a date type field.
        required: true,        // The 'createdAt' field is mandatory.
        default: Date.now()    // Default value is the current date and time when the message is created.
    }
});

// Define an interface 'User' that extends the Mongoose 'Document' interface.
// This interface represents the structure of a user document in MongoDB.
export interface User extends Document {
    username: string;             // The username of the user.
    email: string;                // The email address of the user.
    password: string;             // The hashed password of the user.
    verifyCode: string;           // A verification code sent to the user's email.
    verifyCodeExpiry: Date;       // The expiry date and time of the verification code.
    isVerified: boolean;          // A flag indicating whether the user has verified their account.
    isAcceptingMessage: boolean;  // A flag indicating whether the user is accepting messages.
    messages: Message[];          // An array of messages associated with the user.
}

// Define the schema for the 'User' document, specifying the structure of the user data.
const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,              // 'username' is a string type field.
        required: [true, "Username is required"], // The 'username' field is mandatory with a custom error message.
        trim: true,                // Trims whitespace from the 'username' field.
        unique: true,              // Ensures the 'username' is unique in the database.
    },
    email: {
        type: String,              // 'email' is a string type field.
        required: [true, "Email is required"], // The 'email' field is mandatory with a custom error message.
        unique: true,              // Ensures the 'email' is unique in the database.
        match: [/.+\@.+\..+/, "Please use a valid email address"], // Validates the email format using regex.
    },
    password: {
        type: String,              // 'password' is a string type field.
        required: [true, "Password is required"], // The 'password' field is mandatory with a custom error message.
    },
    verifyCode: {
        type: String,              // 'verifyCode' is a string type field.
        required: [true, "Verify code is required"], // The 'verifyCode' field is mandatory with a custom error message.
    },
    verifyCodeExpiry: {
        type: Date,                // 'verifyCodeExpiry' is a date type field.
        required: [true, "Verify code expiry is required"], // The 'verifyCodeExpiry' field is mandatory with a custom error message.
    },
    isVerified: {
        type: Boolean,             // 'isVerified' is a boolean type field.
        default: false,            // Default value is 'false', indicating the user is not verified by default.
    },
    isAcceptingMessage: {
        type: Boolean,             // 'isAcceptingMessage' is a boolean type field.
        default: true,             // Default value is 'true', indicating the user accepts messages by default.
    },
    messages: [MessageSchema],     // An array of messages, each following the 'MessageSchema' structure.
});

// Create a Mongoose model for the 'User' schema. If the 'User' model already exists, use it.
// Otherwise, create a new model using the 'UserSchema' and name it 'User'.
const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema);

// Export the 'UserModel' to be used in other parts of the application.
export default UserModel;


// all files in schema folder are for validation purposes
// validation schema files