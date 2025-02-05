const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  try {
    // Konfiguracja transportera SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // np. smtp.gmail.com lub smtp.wp.pl
      port: parseInt(process.env.SMTP_PORT, 10), // Port SMTP (465 dla SSL, 587 dla TLS)
      secure: process.env.SMTP_PORT === '465', // Ustawienie SSL/TLS na podstawie portu
      auth: {
        user: process.env.EMAIL_USER, // Adres e-mail nadawcy
        pass: process.env.EMAIL_PASS, // Hasło lub hasło aplikacji
      },
    });

    // Treść wiadomości e-mail
    const mailOptions = {
      from: `"Twoja Aplikacja" <${process.env.EMAIL_USER}>`, // Nadawca
      to: options.to, // Odbiorca
      subject: options.subject, // Temat wiadomości
      text: options.text, // Treść wiadomości w formacie tekstowym
    };

    // Wysyłanie e-maila
    const info = await transporter.sendMail(mailOptions);

    console.log(`E-mail został wysłany: ${info.messageId}`);
  } catch (error) {
    console.error('Błąd wysyłania e-maila:', error.message);
    throw new Error('Nie udało się wysłać wiadomości e-mail');
  }
};

module.exports = sendEmail;
