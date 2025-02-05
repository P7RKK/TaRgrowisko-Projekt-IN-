require('dotenv').config();
const nodemailer = require('nodemailer');

const testSendEmail = async () => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10),
      secure: process.env.SMTP_PORT === 465, // SSL dla portu 465
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"Twoja Aplikacja" <${process.env.EMAIL_USER}>`,
      to: 'odbiorca@example.com', // Podaj e-mail odbiorcy
      subject: 'Test SMTP',
      text: 'To jest testowa wiadomość wysłana przez nodemailer.',
    });

    console.log(`E-mail został wysłany: ${info.messageId}`);
  } catch (error) {
    console.error('Błąd wysyłania e-maila:', error.message);
  }
};

testSendEmail();
