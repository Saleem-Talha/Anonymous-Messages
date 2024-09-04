// Importing the 'Resend' class from the 'resend' package.
// The 'resend' package is typically used for sending emails and other communication services.
import { Resend } from 'resend';

// Creating an instance of the 'Resend' class.
// The 'Resend' class is initialized with an API key from the environment variables.
// The API key is used to authenticate requests to the Resend service.
export const resend = new Resend(process.env.RESEND_API_KEY);

// 'process.env.RESEND_API_KEY' retrieves the API key from environment variables.
// This ensures that sensitive information like API keys are not hardcoded in the source code.
// Make sure that 'RESEND_API_KEY' is defined in your environment variables for the connection to work properly.
