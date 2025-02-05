const express = require('express');
const { reportUser, getAllReports, resolveReport } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Zgłaszanie użytkownika
router.post('/', protect, reportUser);

// Pobieranie zgłoszeń (dla moderatorów)
router.get('/', protect, admin, getAllReports);

// Rozwiązywanie zgłoszeń
router.put('/:id/resolve', protect, admin, resolveReport);

module.exports = router;
