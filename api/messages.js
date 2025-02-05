const express = require('express');
const { sendMessage, getMessages } = require('../controllers/messageController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, sendMessage);
router.get('/', protect, getMessages);
router.get('/unread-count', async (req, res) => {
    try {
      // Przykładowa logika - zmodyfikuj zgodnie z logiką aplikacji
      const unreadCount = 5; // Na przykład: pobierz liczbę z bazy danych
      res.json({ unreadCount });
    } catch (error) {
      console.error('Błąd przy pobieraniu liczby nieprzeczytanych wiadomości:', error);
      res.status(500).json({ message: 'Błąd serwera' });
    }
  });

module.exports = router;
