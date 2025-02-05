const { validationResult } = require('express-validator');

// Middleware do sprawdzania wyników walidacji
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };

// Walidacja rejestracji nowego użytkownika
const { body } = require('express-validator');

const validateRegister = [
  body('email').isEmail().withMessage('Podaj poprawny adres e-mail'),
  body('password')
    .isLength({ min: 8 }).withMessage('Hasło musi mieć co najmniej 8 znaków')
    .matches(/\d/).withMessage('Hasło musi zawierać cyfrę')
    .matches(/[A-Z]/).withMessage('Hasło musi zawierać dużą literę'),
  body('name').notEmpty().withMessage('Imię nie może być puste'),
  validate,
];

// Walidacja logowania użytkownika
const validateLogin = [
    body('email').isEmail().withMessage('Podaj poprawny adres e-mail'),
    body('password').notEmpty().withMessage('Hasło nie może być puste'),
    validate, // Middleware walidacyjny
];


module.exports = { validate,
    validateRegister,
    validateLogin,
 };
