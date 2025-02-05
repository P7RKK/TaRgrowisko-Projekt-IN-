const Auction = require('../models/Auction'); 

/**
 * Zakończenie aukcji
 * @param {Object} auction - Obiekt aukcji
 */
const endAuction = async (auction) => {
  try {
    // Zaktualizuj status aukcji
    auction.isActive = false;

    // Możesz dodać tutaj dodatkową logikę, np. powiadomienia dla sprzedawcy i kupującego
    console.log(`Zakończono aukcję: ${auction.title}`);

    // Zapisz zmiany w bazie danych
    await auction.save();
  } catch (error) {
    console.error(`Błąd podczas zakończenia aukcji "${auction.title}":`, error.message);
  }
};

module.exports = { endAuction };
