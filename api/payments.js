const express = require('express');
const { createPayPalTransaction, capturePayPalTransaction } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Tworzenie transakcji PayPal
router.post('/create', protect, createPayPalTransaction);

// Finalizowanie transakcji PayPal
router.post('/capture', protect, capturePayPalTransaction);

module.exports = router;
