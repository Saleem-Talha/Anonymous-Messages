// Importing the 'Message' type from the '@/models/user.model' file.
// This type represents the structure of a message object, as defined in the user model.
import { Message } from "@/models/user.model";

// Defining a TypeScript interface 'ApiResponse' to represent the structure of an API response.
// This interface specifies the properties that the API response object should include.
export interface ApiResponse {
    success: boolean; // Indicates whether the API request was successful (true) or not (false).
    message: string;  // A message providing additional information about the response (e.g., success or error details).
    isAcceptingMessages?: boolean; // Optional boolean indicating if the user is currently accepting messages.
    messages?: Array<Message>; // Optional array of 'Message' objects, representing a list of messages (if applicable).
}

// The 'ApiResponse' interface helps ensure consistency in the structure of API responses,
// making it easier to handle and process responses in a predictable manner.
