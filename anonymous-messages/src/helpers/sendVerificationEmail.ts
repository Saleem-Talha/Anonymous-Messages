// Importing the 'resend' instance from the '@/lib/resend' module.
// The 'resend' instance is used to interact with the Resend API for sending emails.
import { resend } from "@/lib/resend";

// Importing the 'VerificationEmail' component from the '../../emails/VerificationEmail' file.
// This component defines the structure and content of the verification email to be sent.
import VerificationEmail from "../../emails/VerificationEmail";

// Importing the 'ApiResponse' interface from the '@/types/ApiResponse' file.
// This interface is used to define the structure of the response returned by the 'sendVerificationEmail' function.
import { ApiResponse } from "@/types/ApiResponse";

// Defining the 'sendVerificationEmail' asynchronous function.
// This function is responsible for sending a verification email to the user.
export async function sendVerificationEmail(
    email: string,      // The recipient's email address where the verification email will be sent.
    username: string,   // The username of the recipient, used in the email content.
    verifyCode: string  // The verification code to be included in the email.
): Promise<ApiResponse> {  // The function returns a Promise that resolves to an 'ApiResponse' object.
    try {
        // Sending the verification email using the 'resend' instance.
        await resend.emails.send({
            from: 'onboarding@resend.dev',  // The sender's email address.
            to: email,                      // The recipient's email address.
            subject: 'Verification Code from Anonymous Message',  // Subject line of the email.
            react: VerificationEmail({username, otp: verifyCode}),  // Rendering the email content using the 'VerificationEmail' component.
        });
        // Returning a success response if the email is sent successfully.
        return { success: true, message: "Verification email sent successfully" };
    } catch (emailError) {
        // Logging an error message if sending the email fails.
        console.error("Error sending verification email:", emailError);
        // Returning a failure response if there is an error.
        return { success: false, message: "Failed to send verification email" };
    }
}
