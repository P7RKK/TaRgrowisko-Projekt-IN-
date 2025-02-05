const express = require('express');
const { getAuctions, createAuction, getAuctionById } = require('../controllers/auctionController');
const router = express.Router();
const { searchAuctions } = require('../controllers/auctionController');
const { validateAuction } = require('../controllers/auctionController');
const { createAuction } = require('../controllers/auctionController');


// Lista aukcji
router.get('/', getAuctions);

// Tworzenie aukcji
router.post('/', createAuction);

// Walidacja aukcji przed tworzeniem
router.post('/create', validateAuction, createAuction);

// Szczegóły aukcji
router.get('/:id', getAuctionById);

// Wyszukiwanie aukcji
router.get('/', searchAuctions);




module.exports = router;
