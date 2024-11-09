const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
    day: { 
      type: String, 
      required: true,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    timeSlots: [
      {
        startTime: { type: String, required: true },  
        endTime: { type: String, required: true },    
      }
    ]
  });

const SitterSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,  
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    state: {
        required: true,
        type: String
    },
    suburb: {
        required: true,
        type: String
    },
    postcode: {
        required: true,
        type: String
    },
    streetAddress: {
        required: true,
        type: String
    },
    image: {
      data: Buffer,
      contentType: String
    },
 availability: [availabilitySchema],
  
});

module.exports = mongoose.model('SitterData', SitterSchema, 'SitterData');