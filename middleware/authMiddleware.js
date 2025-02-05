const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware chroniący trasy (wymaga poprawnego tokenu JWT)
const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Brak tokenu, nieautoryzowany dostęp' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');

    next();
  } catch (error) {
    res.status(401).json({ message: 'Nieautoryzowany' });
  }
};

// Middleware autoryzujący dostęp na podstawie roli użytkownika
const authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Brak uprawnień do wykonania tej operacji' });
    }
    next();
  };
};

module.exports = { protect, authorize };
