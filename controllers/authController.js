const { body } = require('express-validator');
const bcrypt = require('bcrypt'); // Import bcrypt
const User = require('../models/User'); // Import modelu User
const { validate } = require('../middleware/validators'); // Import middleware walidacyjnego
const sendEmail = require('../utils/email'); // Import funkcji wysyłającej e-mail

// Rejestracja
const registerUser = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Użytkownik o podanym e-mailu już istnieje' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword, name, isVerified: false });
        await user.save();

        // Generowanie tokena weryfikacyjnego
        const verificationToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        const verificationLink = `http://example.com/verify/${verificationToken}`;

        // Wysyłanie e-maila weryfikacyjnego
        await sendEmail({
            to: email,
            subject: 'Potwierdzenie rejestracji w TarGrowisko',
            text: `Kliknij w poniższy link, aby zweryfikować swoje konto: ${verificationLink}`,
            html: `<p>Kliknij w poniższy link, aby zweryfikować swoje konto:</p><a href="${verificationLink}">Zweryfikuj konto</a>`,
        });

        res.status(201).json({ message: 'Użytkownik zarejestrowany. Sprawdź swoją skrzynkę e-mail, aby zweryfikować konto.' });
    } catch (error) {
        console.error('Błąd rejestracji użytkownika:', error.message);
        res.status(500).json({ error: 'Wystąpił błąd podczas rejestracji użytkownika.' });
    }
};

// Walidacja rejestracji
const validateRegister = [
    body('email').isEmail().withMessage('Podaj poprawny adres e-mail'),
    body('password')
        .isLength({ min: 8 }).withMessage('Hasło musi mieć co najmniej 8 znaków')
        .matches(/\d/).withMessage('Hasło musi zawierać cyfrę')
        .matches(/[A-Z]/).withMessage('Hasło musi zawierać dużą literę'),
    body('name').notEmpty().withMessage('Imię nie może być puste'),
    validate, 
];

module.exports = {
    validateRegister,
    registerUser,
};
