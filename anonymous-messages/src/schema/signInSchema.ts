// Importing the 'z' object from the 'zod' validation library.
// 'zod' is used for schema-based validation of data in TypeScript and JavaScript.
import { z } from 'zod';

// Define a validation schema for user sign-in using 'zod'.
// The schema expects an object containing 'identifier' and 'password' fields.
export const signInSchema = z.object({
    identifier: z.string(), // The 'identifier' field must be a string. This could be a username or email.
    password: z.string(),   // The 'password' field must be a string.
});

// This schema is typically used to validate the data provided during the sign-in process,
// ensuring that both 'identifier' and 'password' fields are present and formatted as strings.
