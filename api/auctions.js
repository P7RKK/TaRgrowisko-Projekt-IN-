const express = require('express');
const { createAuction, placeBid, getAuctionHistory } = require('../controllers/auctionController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

// Tworzenie aukcji
router.post('/', protect, upload.array('images', 5), async (req, res, next) => {
  try {
    await createAuction(req, res);
  } catch (error) {
    next(error);
  }
});

// Składanie oferty
router.post('/:id/bid', protect, async (req, res, next) => {
  try {
    await placeBid(req, res);
  } catch (error) {
    next(error);
  }
});

// Historia aukcji
router.get('/:id/history', protect, async (req, res, next) => {
  try {
    await getAuctionHistory(req, res);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
