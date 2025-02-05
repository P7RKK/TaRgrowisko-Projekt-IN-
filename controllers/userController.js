const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Rejestracja użytkownika
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'Użytkownik już istnieje' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'Zarejestrowano pomyślnie', user });
  } catch (error) {
    res.status(500).json({ message: 'Błąd serwera', error: error.message });
  }
};

// Logowanie użytkownika
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
      // Znajdź użytkownika w bazie danych
      const user = await User.findOne({ email });

      if (!user) {
          console.error('Użytkownik nie został znaleziony.');
          return res.status(400).json({ message: 'Nieprawidłowy e-mail lub hasło' });
      }

      // Sprawdź, czy hasło pasuje
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
          console.error('Hasło nie pasuje.');
          return res.status(400).json({ message: 'Nieprawidłowy e-mail lub hasło' });
      }

      // Sprawdź, czy konto jest zweryfikowane
      if (!user.isVerified) {
          return res.status(403).json({ message: 'Konto nie zostało zweryfikowane. Sprawdź swoją skrzynkę e-mail.' });
      }

      // Generowanie tokena JWT
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(200).json({ token });
  } catch (error) {
      console.error('Błąd logowania:', error.message);
      res.status(500).json({ message: 'Błąd serwera', error: error.message });
  }
};

// Pobieranie profilu użytkownika
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password'); // Bez hasła
    if (!user) {
      return res.status(404).json({ error: 'Użytkownik nie został znaleziony.' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Błąd serwera', details: err.message });
  }
};

// Aktualizacja profilu użytkownika
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Użytkownik nie został znaleziony.' });
    }

    // Aktualizacja danych
    user.name = req.body.name || user.name;
    user.avatar = req.body.avatar || user.avatar;
    if (req.body.password) {
      user.password = req.body.password; // Hasło zahaszowane w modelu
    }

    await user.save();
    res.status(200).json({ message: 'Profil został zaktualizowany.', user });
  } catch (err) {
    res.status(500).json({ error: 'Błąd serwera', details: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
};
