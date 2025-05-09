// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';

// import path from 'path';

// // Load environment variables
// dotenv.config({ path: path.resolve(__dirname, '.env') });
// // Create the transporter
// const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: Number(process.env.SMTP_PORT),
//     auth: {
//         user: process.env.SMTP_USERNAME,
//         pass: process.env.SMTP_PASSWORD
//     }
// });


// // Function to send the mail
// export const SendMail = async(to: string, subject: string, body: string, html?: string) => {
//     try {
//         const info = await transporter.sendMail({
//             from: process.env.EMAIL_FROM,
//             to, subject,
//             text: body,
//             html: html || body,
//         });
//         console.log("Message has been sent successfully", info.messageId);
//         return info;
//     } catch (error) {
//         console.log("Sending Mail failed: ", error);
//         throw error;
//     }
// }



import nodemailer from "nodemailer";

(async () => {
  try {
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "87d5c6eab61d36",
        pass: "e3fed3bad1737e",
      },
      secure: false,
      tls: {
        rejectUnauthorized: false,
      },
    });

    const info = await transporter.sendMail({
      from: '"Test" <no-reply@authsystem.com>',
      to: "test@example.com",
      subject: "Testing Mailtrap",
      text: "Hello, this is a test email.",
    });

    console.log("Email sent successfully:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
})();
