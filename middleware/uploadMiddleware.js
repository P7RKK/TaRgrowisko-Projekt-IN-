const multer = require('multer');
const path = require('path');

// Konfiguracja przechowywania plików
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/auctions');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

// Filtr akceptowanych typów plików
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/gif'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Nieobsługiwany format pliku'), false);
  }
};

// Ustawienia Multer
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, // Ograniczenie rozmiaru pliku do 5MB
});

module.exports = upload;
