const cron = require('node-cron');
const Auction = require('../models/Auction');
const Bid = require('../models/Bid');
const nodemailer = require('nodemailer');

const closeAuctions = async () => {
  const now = new Date();

  // Znajdź aukcje, które się zakończyły
  const auctionsToClose = await Auction.find({ endTime: { $lte: now }, closed: { $ne: true } });

  for (const auction of auctionsToClose) {
    // Znajdź najwyższą ofertę
    const highestBid = await Bid.findOne({ auction: auction._id }).sort({ amount: -1 });

    // Zaktualizuj status aukcji
    auction.closed = true;
    auction.winner = highestBid ? highestBid.bidder : null;
    await auction.save();

    // Wyślij e-mail do twórcy aukcji
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: auction.creatorEmail,
      subject: `Aukcja "${auction.title}" została zakończona`,
      text: highestBid
        ? `Gratulacje! Aukcja została wygrana przez użytkownika o najwyższej ofercie: ${highestBid.amount}.`
        : `Aukcja została zakończona, ale nie otrzymała żadnych ofert.`,
    });

    console.log(`Aukcja ${auction.title} została zamknięta.`);
  }
};

// Zaplanowanie zadania
cron.schedule('*/5 * * * *', closeAuctions); // Co 5 minut
