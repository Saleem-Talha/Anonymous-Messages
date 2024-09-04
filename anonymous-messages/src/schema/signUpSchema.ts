// Importing the 'z' object from the 'zod' validation library.
// 'zod' is used for schema-based validation of data in TypeScript and JavaScript.
// For more details, you can refer to its documentation at github.com/
import { z } from 'zod';

// Define a validation schema for the 'username' field using 'zod'.
// The username must be a string between 2 and 30 characters long and only contain alphanumeric characters and underscores.
export const usernameValidation = z.string()
    .min(2, "Username must be at least 2 characters") // Minimum length of 2 characters with a custom error message.
    .max(30, "Username must not be more than 30 characters") // Maximum length of 30 characters with a custom error message.
    .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters"); // Regex to ensure only letters, numbers, and underscores are allowed.

// Define a validation schema for the 'email' field using 'zod'.
// The email must be a valid email address format.
export const emailValidation = z.string()
    .email({ message: "Invalid email address" }); // Validates the email format with a custom error message.

// Define a validation schema for the 'password' field using 'zod'.
// The password must be a string with at least 6 characters.
export const passwordValidation = z.string()
    .min(6, "Password must be at least 6 characters"); // Minimum length of 6 characters with a custom error message.

// Combine the individual field validations into a single schema for user sign-up using 'zod'.
// This schema validates that the 'username', 'email', and 'password' fields adhere to their respective rules.
export const signUpSchema = z.object({
    username: usernameValidation, // Validates the 'username' field.
    email: emailValidation,       // Validates the 'email' field.
    password: passwordValidation   // Validates the 'password' field.
});
