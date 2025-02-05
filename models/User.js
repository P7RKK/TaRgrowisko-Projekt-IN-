const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // Do haszowania haseł
const jwt = require('jsonwebtoken'); // Do tworzenia tokenów JWT

// Tworzenie schematu użytkownika
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,  // Zapewnia unikalność emaila
      validate: {
        validator: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
        message: 'Podaj poprawny adres e-mail.',
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    avatar: {
      type: String,
      default: 'default-avatar.png', // Domyślny awatar
    },
    role: {
      type: String,
      enum: ['admin', 'seller', 'client'],
      default: 'client',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
    verificationTokenExpires: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Haszowanie hasła przed zapisaniem użytkownika
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Metoda sprawdzająca poprawność hasła
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generowanie tokenu JWT
userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};


const User = mongoose.model('User', userSchema);
module.exports = User;
