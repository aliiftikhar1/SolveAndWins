import nodemailer from 'nodemailer';

export async function sendVerificationEmail(email, token) {
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
      subject: 'Verify Your Email Address',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; color: #444;">
          <h2 style="text-align: center; color: #333;">Welcome to Our Service!</h2>
          <p>Hi there,</p>
          <p>Thank you for signing up. Please confirm your email address by clicking the button below:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.BASE_URL}/api/verification/${token}" 
               style="background-color: #28a745; color: #fff; padding: 15px 25px; text-decoration: none; border-radius: 5px;">
              Verify Email
            </a>
          </div>
          <p>If you did not create an account, no further action is required.</p>
          <p>Best regards,<br/>The Team</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 40px 0;">
          <p style="font-size: 12px; color: #999; text-align: center;">
            © ${new Date().getFullYear()} Our Service. All rights reserved.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Verification email sent successfully.');
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Failed to send verification email');
  }
}
