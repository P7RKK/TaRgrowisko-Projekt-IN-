const express = require('express');
const router = express.Router();
const { isAdmin, authenticateToken } = require('../middleware/authMiddleware');
const User = require('../models/User');
const Auction = require('../models/Auction');

// Pobieranie listy użytkowników
router.get('/users', authenticateToken, isAdmin, async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Błąd serwera', details: err.message });
  }
});

// Blokowanie/odblokowywanie użytkownika
router.put('/users/:id/block', authenticateToken, isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Użytkownik nie został znaleziony.' });
    }
    user.isBlocked = !user.isBlocked;
    await user.save();
    res.status(200).json({ message: 'Status użytkownika zaktualizowany.' });
  } catch (err) {
    res.status(500).json({ error: 'Błąd serwera', details: err.message });
  }
});

// Pobieranie listy aukcji
router.get('/auctions', authenticateToken, isAdmin, async (req, res) => {
  try {
    const auctions = await Auction.find({});
    res.status(200).json(auctions);
  } catch (err) {
    res.status(500).json({ error: 'Błąd serwera', details: err.message });
  }
});

// Usuwanie aukcji
router.delete('/auctions/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const auction = await Auction.findByIdAndDelete(req.params.id);
    if (!auction) {
      return res.status(404).json({ error: 'Aukcja nie została znaleziona.' });
    }
    res.status(200).json({ message: 'Aukcja została usunięta.' });
  } catch (err) {
    res.status(500).json({ error: 'Błąd serwera', details: err.message });
  }
});

// Raporty
router.get('/reports', authenticateToken, isAdmin, async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const auctionCount = await Auction.countDocuments();
    const blockedUsers = await User.countDocuments({ isBlocked: true });

    res.status(200).json({
      users: userCount,
      auctions: auctionCount,
      blockedUsers,
    });
  } catch (err) {
    res.status(500).json({ error: 'Błąd serwera', details: err.message });
  }
});

module.exports = router;
