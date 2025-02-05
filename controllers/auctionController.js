const Auction = require('../models/Auction');
const sendEmail = require('../utils/sendEmail');
const { body } = require('express-validator');
const { validate } = require('../middleware/validators');
const Bid = require('../models/Bid');


// Dodanie nowej oferty
const addBid = async (req, res) => {
  const { auctionId, amount } = req.body;
  const bidderId = req.user.id;

  const auction = await Auction.findById(auctionId);
  if (!auction) {
    return res.status(404).json({ message: 'Aukcja nie znaleziona' });
  }

  const bid = new Bid({
    auction: auctionId,
    bidder: bidderId,
    amount,
  });

  await bid.save();

  // Aktualizacja najwyższej oferty
  auction.currentPrice = Math.max(auction.currentPrice || 0, amount);
  await auction.save();

  res.status(201).json({ message: 'Oferta dodana', bid });
};


// Tworzenie aukcji z przesyłaniem zdjęć
const createAuction = async (req, res) => {
  const { title, description, startingPrice, endTime, category } = req.body;

  try {
    const images = req.files ? req.files.map((file) => `/uploads/auctions/${file.filename}`) : [];

    const auction = await Auction.create({
      title,
      description,
      startingPrice,
      currentPrice: startingPrice,
      endTime,
      creator: req.user.id,
      category,
      images,
    });

    res.status(201).json({ message: 'Aukcja została utworzona', auction });
  } catch (error) {
    res.status(500).json({ message: 'Błąd tworzenia aukcji', error: error.message });
  }
};

// Pobieranie listy aukcji
const listAuctions = async (req, res) => {
  try {
    const auctions = await Auction.find({ isActive: true }).populate('creator', 'name email');
    res.status(200).json(auctions);
  } catch (error) {
    res.status(500).json({ message: 'Błąd pobierania aukcji', error: error.message });
  }
};

// Składanie oferty
const placeBid = async (req, res) => {
  const { auctionId, amount } = req.body;

  try {
    const auction = await Auction.findById(auctionId);

    if (!auction) {
      return res.status(404).json({ message: 'Aukcja nie została znaleziona' });
    }

    if (!auction.isActive) {
      return res.status(400).json({ message: 'Aukcja jest zakończona' });
    }

    if (amount <= auction.currentPrice) {
      return res.status(400).json({ message: 'Oferta musi być wyższa niż obecna cena' });
    }

    auction.bids.push({
      user: req.user.id,
      email: req.user.email,
      amount,
    });
    auction.currentPrice = amount;

    await auction.save();

    res.status(200).json({ message: 'Oferta została złożona', auction });
  } catch (error) {
    res.status(500).json({ message: 'Błąd składania oferty', error: error.message });
  }
};

// Pobieranie historii licytacji dla aukcji
const getAuctionHistory = async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id).populate('bids.user', 'name email');

    if (!auction) {
      return res.status(404).json({ message: 'Aukcja nie została znaleziona' });
    }

    res.status(200).json({ bids: auction.bids });
  } catch (error) {
    res.status(500).json({ message: 'Błąd pobierania historii licytacji', error: error.message });
  }
};

// Automatyczne zamykanie aukcji
const closeExpiredAuctions = async () => {
  try {
    const now = new Date();
    const expiredAuctions = await Auction.find({ isActive: true, endTime: { $lte: now } });

    for (let auction of expiredAuctions) {
      auction.isActive = false;
      await auction.save();

      // Powiadomienie e-mail do zwycięzcy
      if (auction.bids.length > 0) {
        const winner = auction.bids[auction.bids.length - 1];
        await sendEmail(
          winner.email,
          'Gratulacje! Wygrałeś aukcję',
          `Twoja oferta wygrała aukcję "${auction.title}". Kwota: ${winner.amount} PLN.`
        );
      }
    }
  } catch (error) {
    console.error('Błąd zamykania aukcji:', error.message);
  }
};

//Powiadomienie o zakończeniu aukcji
const notifyAuctionWinner = async (auction) => {
  try {
    const message = `Gratulacje! Wygrałeś aukcję: ${auction.title} za ${auction.currentPrice} zł.`;
    await sendEmail(auction.highestBidderEmail, 'Wygrana aukcja', message);
  } catch (error) {
    console.error('Nie udało się wysłać wiadomości e-mail do zwycięzcy:', error.message);
  }
};


// Wyszukiwanie aukcji
exports.searchAuctions = async (req, res) => {
  const { search, category, priceMin, priceMax, page = 1, limit = 10 } = req.query;
  const filters = {};

  // Wyszukiwanie fraz w tytule aukcji
  if (search) {
    filters.title = { $regex: search, $options: 'i' }; // Case insensitive
  }

  // Filtr kategorii
  if (category) {
    filters.category = category;
  }

  // Filtr zakresu cen
  if (priceMin || priceMax) {
    filters.price = {};
    if (priceMin) filters.price.$gte = parseFloat(priceMin);
    if (priceMax) filters.price.$lte = parseFloat(priceMax);
  }

  try {
    const auctions = await Auction.find(filters)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 }); // Sortowanie od najnowszych
    const total = await Auction.countDocuments(filters);

    res.status(200).json({
      auctions,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ error: 'Błąd serwera', details: err.message });
  }
};

//Walidacja aukcji
const validateAuction = [
  body('title').notEmpty().withMessage('Tytuł aukcji jest wymagany'),
  body('description').isLength({ min: 10 }).withMessage('Opis aukcji musi mieć co najmniej 10 znaków'),
  body('startingPrice').isFloat({ min: 0 }).withMessage('Cena początkowa musi być liczbą nieujemną'),
  body('endTime').isISO8601().withMessage('Podaj poprawny format daty zakończenia'),
  validate,
];

module.exports = {
  createAuction,
  listAuctions,
  placeBid,
  getAuctionHistory,
  closeExpiredAuctions,
  validateAuction,
  addBid
};


