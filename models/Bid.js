const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
  auction: { type: mongoose.Schema.Types.ObjectId, ref: 'Auction', required: true },
  bidder: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true, min: 0 },
  timestamp: { type: Date, default: Date.now },
});

// Dodanie indeksu
bidSchema.index({ auction: 1, amount: -1 });

const Bid = mongoose.model('Bid', bidSchema);
module.exports = Bid;
