// models/Hotel.js
const mongoose = require('mongoose');
const hotelSchema = new mongoose.Schema({
  hotelId: {
    type: String,
    required: true,
    unique: true,
  },
  hotelName: {
    type: String,
    required: true,
    trim: true,
  },
  currentRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  
numberOfUsersRated: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: { type: String, required: true },
      comment: { type: String, required: true },
      rating: { type: Number, required: true, min: 0, max: 5 },
    },
  ],
  dishes: {
    type: [String], 
    default: [],
  },
  password: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  thumbnailImage: {
    type: String, // Path to the local uploaded image
    required: true,
    trim: true,
  },  
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
