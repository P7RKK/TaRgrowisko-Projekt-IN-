const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const authenticateToken = require('../middleware/authMiddleware');

// Pobieranie wiadomości między dwoma użytkownikami
router.get('/:receiverId', authenticateToken, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user.id, receiver: req.params.receiverId },
        { sender: req.params.receiverId, receiver: req.user.id },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Błąd serwera', details: err.message });
  }
});

// Wysyłanie wiadomości
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { receiver, content } = req.body;

    const message = await Message.create({
      sender: req.user.id,
      receiver,
      content,
    });

    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: 'Błąd serwera', details: err.message });
  }
});

// Pobieranie konwersacji
router.get('/conversations', authenticateToken, async (req, res) => {
    try {
      const conversations = await Message.aggregate([
        { $match: { $or: [{ sender: req.user.id }, { receiver: req.user.id }] } },
        {
          $group: {
            _id: {
              $cond: [
                { $eq: ['$sender', req.user.id] },
                '$receiver',
                '$sender',
              ],
            },
            lastMessage: { $last: '$$ROOT' },
          },
        },
      ])
        .lookup({
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        })
        .project({
          _id: 1,
          lastMessage: 1,
          user: { $arrayElemAt: ['$user', 0] },
        });
  
      res.status(200).json(conversations);
    } catch (err) {
      res.status(500).json({ error: 'Błąd serwera', details: err.message });
    }
  });

  // Liczba nieprzeczytanych wiadomości dla zalogowanego użytkownika
router.get('/unread-count', authenticateToken, async (req, res) => {
    try {
      const unreadCount = await Message.countDocuments({
        receiver: req.user.id,
        isRead: false,
      });
  
      res.status(200).json({ unreadCount });
    } catch (err) {
      res.status(500).json({ error: 'Błąd serwera', details: err.message });
    }
  });
  

module.exports = router;
