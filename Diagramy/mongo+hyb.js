const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  recommendations: [
    {
      gameId: mongoose.Schema.Types.ObjectId,
      score: Number
    }
  ]
});

const Recommendation = mongoose.model('Recommendation', recommendationSchema);

async function saveRecommendations(userId, recommendations) {
  await Recommendation.updateOne(
    { userId },
    { recommendations },
    { upsert: true }
  );
}