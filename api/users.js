const express = require('express');
const protect = require('../middleware/authMiddleware');
const { getUserProfile, updateUserProfile, registerUser, loginUser } = require('../controllers/userController');

const router = express.Router();

// Rejestracja użytkownika
router.post('/register', registerUser);

// Logowanie użytkownika
router.post('/login', loginUser);

// Pobieranie profilu użytkownika
router.get('/profile', protect, getUserProfile);

// Aktualizacja profilu użytkownika
router.put('/profile', protect, updateUserProfile);

module.exports = router;
