const express = require('express');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const protect = require('../middleware/authMiddleware');
const sendEmail = require('../utils/sendEmail');

const router = express.Router();

// Rejestracja użytkownika
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Sprawdzenie, czy użytkownik już istnieje
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Użytkownik o podanym emailu już istnieje' });
    }

    // Generowanie tokenu weryfikacyjnego
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Hashowanie hasła i tworzenie użytkownika
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      isVerified: false,
    });

    await user.save();

    // Wysyłanie e-maila weryfikacyjnego
    try {
      const verificationUrl = `http://localhost:5000/api/users/verify/${verificationToken}`;
      await sendEmail({
        to: email,
        subject: 'Weryfikacja konta',
        text: `Kliknij w poniższy link, aby zweryfikować swoje konto: ${verificationUrl}`,
      });
    } catch (error) {
      console.error('Błąd wysyłania e-maila:', error.message);
      await User.deleteOne({ email });
      return res.status(500).json({ message: 'Nie udało się wysłać e-maila weryfikacyjnego' });
    }

    res.status(201).json({
      message: 'Rejestracja zakończona sukcesem. Sprawdź email, aby potwierdzić swoje konto.',
    });
  } catch (error) {
    console.error('Błąd rejestracji:', error.message);
    res.status(500).json({ message: 'Wystąpił błąd podczas rejestracji' });
  }
});

// Weryfikacja konta użytkownika
router.get('/verify/:token', async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(400).json({ message: 'Nieprawidłowy token weryfikacyjny' });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: 'Konto zostało już zweryfikowane' });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.json({ message: 'Konto zostało pomyślnie zweryfikowane' });
  } catch (error) {
    console.error('Błąd weryfikacji konta:', error.message);
    res.status(500).json({ message: 'Wystąpił błąd podczas weryfikacji' });
  }
});

// Logowanie użytkownika
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Wszystkie pola są wymagane' });
    }

    console.log('Dane logowania:', { email, password });

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Nieprawidłowy email lub hasło' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Nieprawidłowy email lub hasło' });
    }

    if (!user.isVerified) {
      return res.status(401).json({ message: 'Twoje konto nie zostało jeszcze zweryfikowane' });
    }

    const token = generateToken(user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error('Błąd logowania:', error.message);
    res.status(500).json({ message: 'Wystąpił błąd serwera' });
  }
});

// Profil użytkownika (chroniona trasa)
router.get('/profile', protect, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Nieautoryzowany dostęp' });
    }

    res.json({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    });
  } catch (error) {
    console.error('Błąd podczas pobierania profilu:', error.message);
    res.status(500).json({ message: 'Wystąpił błąd serwera' });
  }
});

// Resetowanie hasła - wysyłanie tokenu
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Użytkownik o podanym emailu nie istnieje' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 3600000; // 1 godzina

    await user.save();

    const resetUrl = `http://localhost:5000/api/users/reset-password/${resetToken}`;
    await sendEmail({
      to: email,
      subject: 'Resetowanie hasła',
      text: `Kliknij w poniższy link, aby zresetować swoje hasło: ${resetUrl}`,
    });

    res.json({ message: 'E-mail do resetowania hasła został wysłany' });
  } catch (error) {
    console.error('Błąd resetowania hasła:', error.message);
    res.status(500).json({ message: 'Wystąpił błąd podczas resetowania hasła' });
  }
});

// Resetowanie hasła - ustawienie nowego
router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Nieprawidłowy lub wygasły token' });
    }

    if (password.length < 8 || !/[A-Z]/.test(password) || !/\d/.test(password)) {
      return res.status(400).json({
        message: 'Hasło musi mieć co najmniej 8 znaków, zawierać wielką literę i cyfrę',
      });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({ message: 'Hasło zostało pomyślnie zresetowane' });
  } catch (error) {
    console.error('Błąd podczas resetowania hasła:', error.message);
    res.status(500).json({ message: 'Wystąpił błąd podczas resetowania hasła' });
  }
});

module.exports = router;
