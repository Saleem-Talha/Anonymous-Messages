// Importing necessary modules and functions.
// 'dbConnect' is used to establish a connection to the database.
// 'UserModel' is the Mongoose model for user data.
// 'bcryptjs' is used for hashing passwords.
// 'sendVerificationEmail' is a helper function to send verification emails.
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/models/user.model';
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from '@/helpers/sendVerificationEmail';

// Exporting an asynchronous function to handle POST requests for user registration.
export async function POST(request: Request) {
    // Establish a connection to the database.
    await dbConnect();
  
    try {
        // Extracting 'username', 'email', and 'password' from the request JSON body.
        const { username, email, password } = await request.json();
  
        // Check if a verified user with the same username already exists.
        const existingVerifiedUserByUsername = await UserModel.findOne({
            username,
            isVerified: true,
        });
  
        if (existingVerifiedUserByUsername) {
            // Return a response indicating that the username is already taken.
            return Response.json(
                {
                    success: false,
                    message: 'Username is already taken',
                },
                { status: 400 }
            );
        }
  
        // Check if a user with the same email already exists.
        const existingUserByEmail = await UserModel.findOne({ email });
        // Generate a random verification code.
        let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
  
        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                // Return a response indicating that a user with this email already exists and is verified.
                return Response.json(
                    {
                        success: false,
                        message: 'User already exists with this email',
                    },
                    { status: 400 }
                );
            } else {
                // If the user exists but is not verified, update the user's password and verification code.
                const hashedPassword = await bcrypt.hash(password, 10);
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000); // Set expiry to 1 hour from now.
                await existingUserByEmail.save();
            }
        } else {
            // If no user exists with the given email, create a new user.
            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1); // Set expiry to 1 hour from now.

            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessages: true,
                messages: [],
            });

            await newUser.save();
        }
  
        // Send a verification email to the user.
        const emailResponse = await sendVerificationEmail(
            email,
            username,
            verifyCode
        );
        if (!emailResponse.success) {
            // If the email sending fails, return a response indicating failure.
            return Response.json(
                {
                    success: false,
                    message: emailResponse.message,
                },
                { status: 500 }
            );
        }
  
        // Return a success response indicating that the user was registered successfully.
        return Response.json(
            {
                success: true,
                message: 'User registered successfully. Please verify your account.',
            },
            { status: 201 }
        );
    } catch (error) {
        // Log the error and return a response indicating a server error.
        console.error('Error registering user:', error);
        return Response.json(
            {
                success: false,
                message: 'Error registering user',
            },
            { status: 500 }
        );
    }
}
