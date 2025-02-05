const mongoose = require('mongoose');

const userLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true },
  details: { type: String },
  ipAddress: { type: String },
  userAgent: { type: String },
  timestamp: { type: Date, default: Date.now },
});

// Indeksy
userLogSchema.index({ user: 1, timestamp: -1 });
userLogSchema.index({ timestamp: 1 }, { expireAfterSeconds: 365 * 24 * 60 * 60 }); // 1 rok


module.exports = mongoose.model('UserLog', userLogSchema);
