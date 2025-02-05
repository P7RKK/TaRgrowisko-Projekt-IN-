const checkBlocked = (req, res, next) => {
    if (req.user && req.user.isBlocked) {
      return res.status(403).json({ message: 'Twoje konto jest zablokowane.' });
    }
    next();
  };
  
  module.exports = { checkBlocked };
  