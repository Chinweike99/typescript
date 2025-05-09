import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
// dotenv.config();

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
  secure: false,
  tls :{ 
    rejectUnauthorized: false,
  }
});

console.log({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  user: process.env.SMTP_USERNAME,
  pass: process.env.SMTP_PASSWORD,
});


// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: process.env.SMTP_PORT || "2525",
//   secure: false,
//   auth: {
//     user: process.env.SMTP_USERNAME,
//     pass: process.env.SMTP_PASSWORD,
//   },
//   // Add debug option for troubleshooting
//   debug: process.env.NODE_ENV === 'development',
// });


// Verify the connection configuration
transporter.verify(function(error, success) {
  if (error) {
    console.log("SMTP server connection error:", error);
  } else {
    console.log("SMTP server connection verified successfully");
  }
});



interface EmailOptions {
  email: string;
  subject: string;
  html: string;
}

export const sendEmail = async (options: EmailOptions) => {
  try {
    const mailOption = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: options.email,
      subject: options.subject,
      html: options.html,
    });
    console.log("Mail was successfully sent", mailOption.messageId);
    return mailOption;
  } catch (error) {
    console.log("Error sending mail", error);
    throw error;
  }
};

// export const sendVerificationEmail = async(email: string, token: string) => {
//     const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

//     const message = `
//         <h1>Verify Your Email</h1>
//     <p>Please click the link below to verify your email address:</p>
//     <a href="${verificationUrl}" target="_blank">Verify Email</a>
//     <p>If you did not create an account, please ignore this email.</p>
//     `
//     await sendEmail({
//         email,
//         subject: "Email Verification",
//         html: message
//     })
// };

export const sendVerificationEmail = async (email: string, token: string) => {
  try {
    // Generate the verification URL using the built-in URL module for safer URL construction
    const clientUrl = process.env.CLIENT_URL || "http://localhost:5000";
    const verificationUrl = new URL("/verify-email", clientUrl);
    verificationUrl.searchParams.append("token", token);

    const message = `
            <h1>Verify Your Email</h1>
            <p>Please click the link below to verify your email address:</p>
            <a href="${verificationUrl.toString()}" target="_blank">Verify Email</a>
            <p>If you did not create an account, please ignore this email.</p>
        `;

    // Send the email
    const mailInfo = await sendEmail({
      email,
      subject: "Email Verification",
      html: message,
    });

    console.log(
      `Verification email sent to ${email}. Message ID: ${mailInfo.messageId}`
    );
    return mailInfo;
  } catch (error) {
    console.error(`Failed to send verification email to ${email}:`, error);
    throw new Error(
      "Failed to send verification email. Please try again later."
    );
  }
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  try {
    // Generate the verification URL using the built-in URL module for safer URL construction
    const clientUrl = process.env.CLIENT_URL || "http://localhost:5000";
    const resetUrl = new URL("/verify-email", clientUrl);
    resetUrl.searchParams.append("token", token);

    // Construct the HTML message
    const message = `
                <h1>Reset your Password</h1>
                <p>Please click the link below to reset your password:</p>
                <a href="${resetUrl.toString()}" target="_blank">Verify Email</a>
                <p>If you did not create an account, please ignore this email.</p>
            `;

    // Send the email
    const mailInfo = await sendEmail({
      email,
      subject: "Reset Password",
      html: message,
    });

    console.log(
      `Verification email sent to ${email}. Message ID: ${mailInfo.messageId}`
    );
    return mailInfo;
  } catch (error) {
    console.error(`Failed to send verification email to ${email}:`, error);
    throw new Error(
      "Failed to send verification email. Please try again later."
    );
  }
};


