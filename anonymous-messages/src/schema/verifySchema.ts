// Importing the 'z' object from the 'zod' validation library.
// 'zod' is used for schema-based validation of data in TypeScript and JavaScript.
import { z } from 'zod';

// Define a validation schema for verifying a code using 'zod'.
// The schema expects an object containing a 'code' field.
export const verifySchema = z.object({
    code: z.string() // The 'code' field must be a string.
        .length(6, "Verification code must be 6 digits") // The string must be exactly 6 characters long, with a custom error message if it is not.
});
