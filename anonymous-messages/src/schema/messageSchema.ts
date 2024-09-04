// Importing the 'z' object from the 'zod' validation library.
// 'zod' is used for schema-based validation of data in TypeScript and JavaScript.
import { z } from 'zod';

// Define a validation schema for a message using 'zod'.
// The schema expects an object containing a 'content' field.
export const messageSchema = z.object({
    content: z
        .string() // The 'content' field must be a string.
        .min(10, { message: "Content must be at least 10 characters" }) // Minimum length of 10 characters, with a custom error message.
        .max(300, { message: "Content must be at most 300 characters" }) // Maximum length of 300 characters, with a custom error message.
});

// This schema is useful for validating the content of a message,
// ensuring that the 'content' field is a string between 10 and 300 characters in length.
