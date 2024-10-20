import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function sendPasswordResetEmail(email) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: process.env.EMAIL_USERNAME, 
        pass: process.env.EMAIL_PASSWORD, 
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: 'Reset Your Password',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; color: #444;">
          <h2 style="text-align: center; color: #333;">Password Reset Request</h2>
          <p>Hi there,</p>
          <p>We received a request to reset your password. If you didn't make this request, you can safely ignore this email.</p>
          <p>To reset your password, click the button below:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.BASE_URL}/forgetpassword/${email}" 
               style="background-color: #dc3545; color: #fff; padding: 15px 25px; text-decoration: none; border-radius: 5px;">
              Reset Password
            </a>
          </div>
          <p>Best regards,<br/>The Team</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 40px 0;">
          <p style="font-size: 12px; color: #999; text-align: center;">
            © ${new Date().getFullYear()} Our Service. All rights reserved.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent successfully.');
    return NextResponse.json("email send");
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw new Error('Failed to send password reset email');
  }
}
