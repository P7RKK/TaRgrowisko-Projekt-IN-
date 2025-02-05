const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const protect = require('../middleware/authMiddleware');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

// Rejestracja użytkownika
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Użytkownik z tym e-mailem już istnieje.' });
    }

    const verificationToken = crypto.randomBytes(32).toString('hex');
    const user = new User({
      name,
      email,
      password,
      verificationToken,
      verificationTokenExpires: Date.now() + 3600000, // 1 godzina
    });

    await user.save();

    const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;
    await sendEmail(email, 'Weryfikacja konta', `Kliknij tutaj, aby zweryfikować swoje konto: ${verificationUrl}`);

    res.status(201).json({ message: 'Zarejestrowano. Sprawdź e-mail w celu weryfikacji.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Wystąpił błąd podczas rejestracji.' });
  }
});

// Weryfikacja e-mail
router.get('/verify-email', async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ message: 'Brak tokenu w zapytaniu.' });
    }

    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Nieprawidłowy lub wygasły token.' });
    }

    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpires = null;
    await user.save();

    res.status(200).json({ message: 'Konto zostało zweryfikowane pomyślnie.' });
  } catch (error) {
    console.error('Błąd podczas weryfikacji e-mail:', error.message);
    res.status(500).json({ message: 'Wystąpił błąd serwera.' });
  }
});

// Logowanie użytkownika
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Nieprawidłowy e-mail lub hasło.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Nieprawidłowy e-mail lub hasło.' });
    }

    if (!user.isVerified) {
      return res.status(403).json({ message: 'Konto nie zostało zweryfikowane.' });
    }

    const token = user.generateToken();
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error('Błąd logowania:', error.message);
    res.status(500).json({ message: 'Wystąpił błąd serwera.' });
  }
});

module.exports = router;
