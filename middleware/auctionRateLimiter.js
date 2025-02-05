const rateLimit = require('express-rate-limit');

const auctionRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuta
  max: 10, // Maksymalnie 10 ofert na minutę
  message: 'Zbyt wiele ofert w krótkim czasie. Spróbuj ponownie później.',
});

module.exports = auctionRateLimiter;
