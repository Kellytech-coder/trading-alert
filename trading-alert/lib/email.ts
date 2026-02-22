import nodemailer from 'nodemailer';

// Create a transporter for sending emails
// For production, you would configure this with real SMTP credentials
const createTransporter = () => {
  // For development, use Ethereal (fake SMTP service)
  // For production, use real SMTP credentials
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER || 'test@ethereal.email',
      pass: process.env.EMAIL_PASS || 'testpassword',
    },
  });
};

export interface AlertEmailData {
  userEmail: string;
  crypto: string;
  targetPrice: number;
  currentPrice: number;
  condition: string;
}

export const sendAlertEmail = async (data: AlertEmailData): Promise<boolean> => {
  try {
    const transporter = createTransporter();

    const conditionText = data.condition === 'above' ? 'risen above' : 'fallen below';
    
    const mailOptions = {
      from: '"Crypto Alert" <alerts@cryptoalert.com>',
      to: data.userEmail,
      subject: `🚀 ${data.crypto.toUpperCase()} Price Alert Triggered!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #10B981;">Price Alert Triggered! 🚀</h1>
          <p>Hello,</p>
          <p>Your price alert has been triggered!</p>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Crypto:</strong> ${data.crypto.toUpperCase()}</p>
            <p><strong>Condition:</strong> Price ${conditionText}</p>
            <p><strong>Target Price:</strong> $${data.targetPrice.toLocaleString()}</p>
            <p><strong>Current Price:</strong> $${data.currentPrice.toLocaleString()}</p>
          </div>
          <p>Visit your dashboard to manage this alert.</p>
          <p style="color: #6b7280; font-size: 12px; margin-top: 30px;">
            This is an automated message from Crypto Alert. Please do not reply to this email.
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    
    // For development with Ethereal, log the preview URL
    if (process.env.NODE_ENV !== 'production') {
      console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    }
    
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

export const sendWelcomeEmail = async (email: string, name: string): Promise<boolean> => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: '"Crypto Alert" <alerts@cryptoalert.com>',
      to: email,
      subject: 'Welcome to Crypto Alert! 🚀',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #10B981;">Welcome to Crypto Alert! 🎉</h1>
          <p>Hello ${name},</p>
          <p>Thank you for joining Crypto Alert! We're excited to help you track cryptocurrency prices.</p>
          <p>With Crypto Alert, you can:</p>
          <ul>
            <li>Set price alerts for your favorite cryptocurrencies</li>
            <li>Get notified via email when prices hit your targets</li>
            <li>Track your alert history</li>
          </ul>
          <p>Start by creating your first alert on the dashboard!</p>
          <p style="color: #6b7280; font-size: 12px; margin-top: 30px;">
            This is an automated message from Crypto Alert. Please do not reply to this email.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return false;
  }
};
