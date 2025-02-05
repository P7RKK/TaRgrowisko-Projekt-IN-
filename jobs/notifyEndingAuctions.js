const cron = require('node-cron');
const Auction = require('../models/Auction');
const nodemailer = require('nodemailer');

const notifyEndingAuctions = async () => {
  const oneHourFromNow = new Date();
  oneHourFromNow.setHours(oneHourFromNow.getHours() + 1);

  const endingSoonAuctions = await Auction.find({
    endTime: { $lte: oneHourFromNow, $gt: new Date() },
    notified: { $ne: true },
  });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  for (const auction of endingSoonAuctions) {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: auction.creatorEmail,
      subject: `Aukcja "${auction.title}" kończy się za godzinę`,
      text: `Pamiętaj, że Twoja aukcja "${auction.title}" zakończy się za godzinę.`,
    });

    // Oznacz aukcję jako powiadomioną
    auction.notified = true;
    await auction.save();
  }

  console.log(`Wysłano powiadomienia dla ${endingSoonAuctions.length} aukcji.`);
};

// Zaplanowanie zadania
cron.schedule('0 * * * *', notifyEndingAuctions); // Co godzinę
