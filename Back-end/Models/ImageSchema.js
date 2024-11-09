const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  imageName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Image', ImageSchema);