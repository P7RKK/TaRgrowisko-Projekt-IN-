const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Offer = require('../models/Offer');
const User = require('../models/User');

// Middleware do uwierzytelniania użytkownika za pomocą tokenu JWT
const authenticateToken = (req, res, next) => {
  // Pobieranie tokenu z nagłówka "Authorization"
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401); // Brak tokenu - zwracamy błąd 401 (Unauthorized)

  // Weryfikacja tokenu
  jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Token nieważny - zwracamy błąd 403 (Forbidden)
    req.user = user; // Dodajemy dane użytkownika do żądania
    next(); // Przechodzimy do kolejnej funkcji
  });
};

// Endpoint POST /offers - Dodawanie nowej oferty
router.post('/offers', authenticateToken, async (req, res) => {
  const { title, description, price, images } = req.body; // Pobieranie danych z ciała żądania

  // Walidacja danych wejściowych
  if (!title || !description || !price) {
    return res.status(400).json({ error: 'Tytuł, opis i cena są wymagane.' });
  }

  try {
    // Tworzenie nowej oferty na podstawie danych wejściowych
    const newOffer = new Offer({
      title,
      description,
      price,
      images: images || [], // Opcjonalna lista zdjęć
      userId: req.user.id, // ID użytkownika pobrane z tokenu JWT
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await newOffer.save(); // Zapis oferty do bazy danych

    // Opcjonalne: aktualizacja listy ofert użytkownika
    await User.findByIdAndUpdate(req.user.id, { $push: { offers: newOffer._id } });

    res.status(201).json(newOffer); // Zwracamy nowo utworzoną ofertę
  } catch (err) {
    res.status(500).json({ error: 'Błąd serwera', details: err.message }); // Obsługa błędów serwera
  }
});

// Endpoint GET /offers - Pobieranie listy ofert
router.get('/offers', async (req, res) => {
    const { priceMin, priceMax, title } = req.query; // Pobieranie parametrów zapytania
    const filters = {};
  
    // Dodawanie filtrów na podstawie parametrów
    if (priceMin) filters.price = { ...filters.price, $gte: parseFloat(priceMin) };
    if (priceMax) filters.price = { ...filters.price, $lte: parseFloat(priceMax) };
    if (title) filters.title = { $regex: title, $options: 'i' }; // Filtrowanie po tytule (case insensitive)
  
    try {
      // Pobieranie ofert z bazy danych na podstawie filtrów
      const offers = await Offer.find(filters).populate('userId', 'name email'); // Opcjonalne: dołączenie danych użytkownika
      res.status(200).json(offers); // Zwracanie listy ofert
    } catch (err) {
      res.status(500).json({ error: 'Błąd serwera', details: err.message }); // Obsługa błędów serwera
    }
  });
  
  // Endpoint GET /offers/:id - Pobieranie szczegółów jednej oferty
  router.get('/offers/:id', async (req, res) => {
    const { id } = req.params; // Pobieranie ID oferty z parametrów ścieżki
  
    try {
      // Pobieranie oferty na podstawie ID
      const offer = await Offer.findById(id).populate('userId', 'name email'); // Opcjonalne: dołączenie danych użytkownika
      if (!offer) {
        return res.status(404).json({ error: 'Oferta nie została znaleziona.' }); // Jeśli oferta nie istnieje
      }
      res.status(200).json(offer); // Zwracanie szczegółów oferty
    } catch (err) {
      res.status(500).json({ error: 'Błąd serwera', details: err.message }); // Obsługa błędów serwera
    }
  });

  // Endpoint PUT /offers/:id - Aktualizacja oferty
router.put('/offers/:id', authenticateToken, async (req, res) => {
    const { id } = req.params; // Pobieranie ID oferty z parametrów
    const { title, description, price, images } = req.body; // Pobieranie danych z ciała żądania
  
    try {
      // Pobieranie oferty z bazy
      const offer = await Offer.findById(id);
  
      if (!offer) {
        return res.status(404).json({ error: 'Oferta nie została znaleziona.' }); // Jeśli oferta nie istnieje
      }
  
      // Sprawdzanie, czy użytkownik jest właścicielem oferty
      if (offer.userId.toString() !== req.user.id) {
        return res.status(403).json({ error: 'Nie masz uprawnień do edycji tej oferty.' }); // Brak dostępu
      }
  
      // Aktualizacja danych oferty
      if (title) offer.title = title;
      if (description) offer.description = description;
      if (price) offer.price = price;
      if (images) offer.images = images;
  
      offer.updatedAt = new Date(); // Aktualizacja znacznika czasu
  
      await offer.save(); // Zapis zmian do bazy danych
  
      res.status(200).json(offer); // Zwracanie zaktualizowanej oferty
    } catch (err) {
      res.status(500).json({ error: 'Błąd serwera', details: err.message }); // Obsługa błędów
    }
  });
  
  // Endpoint DELETE /offers/:id - Usuwanie oferty
  router.delete('/offers/:id', authenticateToken, async (req, res) => {
    const { id } = req.params; // Pobieranie ID oferty z parametrów
  
    try {
      // Pobieranie oferty z bazy
      const offer = await Offer.findById(id);
  
      if (!offer) {
        return res.status(404).json({ error: 'Oferta nie została znaleziona.' }); // Jeśli oferta nie istnieje
      }
  
      // Sprawdzanie, czy użytkownik jest właścicielem oferty
      if (offer.userId.toString() !== req.user.id) {
        return res.status(403).json({ error: 'Nie masz uprawnień do usunięcia tej oferty.' }); // Brak dostępu
      }
  
      await offer.remove(); // Usunięcie oferty z bazy danych
  
      // Usunięcie oferty z listy użytkownika
      const user = await User.findById(req.user.id);
      await user.removeOffer(id);
  
      res.status(200).json({ message: 'Oferta została usunięta.' }); // Potwierdzenie usunięcia
    } catch (err) {
      res.status(500).json({ error: 'Błąd serwera', details: err.message }); // Obsługa błędów
    }
  });
  

module.exports = router;
