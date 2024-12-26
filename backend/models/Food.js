const mongoose = require('mongoose');

// Define the schema for the Food model
const foodSchema = new mongoose.Schema({
  id: {
    type: String, // Custom 'id' field as a string (you can choose the type)
    required: true,
    unique: true,  // Ensures that the 'id' is unique
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String, // URL or path to the image of the food
    required: true,
  }
});

// Create the Food model using the schema
const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
