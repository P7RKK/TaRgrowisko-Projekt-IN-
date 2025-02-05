const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startingPrice: { type: Number, required: true },
  currentPrice: { type: Number, required: true },
  endTime: { type: Date, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String },
  isActive: { type: Boolean, default: true },
  images: [{ type: String }],
});

auctionSchema.index({ title: 'text', description: 'text', category: 1 });
auctionSchema.index({ endTime: 1, isActive: 1, creator: 1 });

module.exports = mongoose.model('Auction', auctionSchema);
