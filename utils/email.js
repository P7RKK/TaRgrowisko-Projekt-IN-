const nodemailer = require('nodemailer');

// Konfiguracja klienta SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Wysyłanie wiadomości e-mail
const sendEmail = async (options) => {
  const mailOptions = {
    from: `"Targrowisko" <${process.env.SMTP_EMAIL}>`,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`E-mail wysłany do ${options.to}`);
  } catch (error) {
    console.error(`Błąd wysyłania e-maila: ${error.message}`);
  }
};

module.exports = sendEmail;
