const cron = require('node-cron');
const Auction = require('../models/Auction');
const sendEmail = require('../utils/sendEmail');

// Zadanie: Zamknięcie aukcji po zakończeniu czasu
const closeExpiredAuctions = async () => {
  console.log('Sprawdzanie i zamykanie zakończonych aukcji...');
  try {
    const now = new Date();
    const expiredAuctions = await Auction.find({ isActive: true, endTime: { $lte: now } });

    for (let auction of expiredAuctions) {
      auction.isActive = false;
      await auction.save();

      // Powiadomienie e-mail o wygranej
      if (auction.bids.length > 0) {
        const winner = auction.bids[auction.bids.length - 1];
        await sendEmail(
          winner.email,
          'Gratulacje! Wygrałeś aukcję',
          `Twoja oferta wygrała aukcję "${auction.title}". Kwota: ${winner.amount} PLN.`
        );
      }
    }
    console.log('Zakończono zamykanie aukcji.');
  } catch (error) {
    console.error('Błąd zamykania aukcji:', error.message);
  }
};

// Uruchamianie CRON job co minutę
cron.schedule('* * * * *', closeExpiredAuctions);
