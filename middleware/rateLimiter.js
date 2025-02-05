const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minut
  max: 5, // Maksymalnie 5 prób
  message: 'Zbyt wiele nieudanych prób logowania. Spróbuj ponownie za 15 minut.',
  headers: true,
});

module.exports = { loginLimiter };
