// Importing the 'z' object from the 'zod' validation library.
// 'zod' is used for schema-based validation of data in TypeScript and JavaScript.
import { z } from 'zod';

// Define a validation schema for accepting messages using 'zod'.
// The schema expects an object containing an 'acceptMessages' field.
export const acceptMessageSchema = z.object({
    acceptMessages: z.boolean(), // The 'acceptMessages' field must be a boolean value (true or false).
});

// This schema is useful for validating a user's preference regarding whether they accept messages or not,
// ensuring that the 'acceptMessages' field is explicitly set as a boolean.
