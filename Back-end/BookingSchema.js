const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  sitter: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Sitter', 
    required: true 
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'cancelled'], 
    default: 'pending'
  },
});

module.exports = mongoose.model('BookingData', BookingSchema);