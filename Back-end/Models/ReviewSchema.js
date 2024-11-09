const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  sitterId: { type: mongoose.Schema.Types.String, ref: 'Sitter', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
}, 
{ timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;