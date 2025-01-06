const express = require('express');
const router = express.Router();
const Hotel = require('../models/Hotel'); 
const User = require ('../models/User');
const { authenticateToken } = require('../controllers/Authmiddleware');

// Route to get all hotels
router.get('/getall', async (req, res) => {
    console.log('GET /api/hotel/getall route hit');
  try {
    const hotels = await Hotel.find();
    
    
    res.status(200).json({
      success: true,
      data: hotels,
    });
    console.log(hotels)
  } catch (error) {
    console.error('Error fetching hotels:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch hotels. Please try again.',
    });
  }
});


router.get('/details/:hotelId', async (req, res) => {
  const { hotelId } = req.params;
  try {
    const hotel = await Hotel.findOne({ hotelId });
    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found.',
      });
    }
    res.status(200).json({
      success: true,
      data: hotel,
    });
  } catch (error) {
    console.error('Error fetching hotel details:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch hotel details. Please try again.',
    });
  }
});  


router.get('/reviews/:hotelId',async (req, res) => {
  const { hotelId } = req.params;
  try {
    const hotel = await Hotel.findOne({ hotelId });
    
    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found.',
      });
    }

    const reviews = hotel.reviews; 

    res.status(200).json({
      success: true,
      data: reviews, 
    });
  } catch (error) {
    console.error('Error fetching hotel reviews:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch hotel reviews. Please try again.',
    });
  }
});


router.post('/reviews/:hotelId',authenticateToken,  async (req, res) => {
  const { hotelId } = req.params;
  const { userId, comment, rating } = req.body;
  try {
    // Check if the user exists
    const user = await User.findOne({ userId: userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Find the hotel
    const hotel = await Hotel.findOne({ hotelId });
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found.' });
    }

    // Add the review to the hotel's reviews array
    const newReview = {
      user: user.name, // Store the username or userId
      comment,
      rating,
    };
    hotel.reviews.push(newReview);
    // Optionally update the average rating
    const totalRating = hotel.reviews.reduce((sum, review) => sum + review.rating, 0);
    hotel.currentRating = totalRating / hotel.reviews.length;

    // Save the updated hotel document
    await hotel.save();

    res.status(200).json({
      message: 'Review added successfully.',
      newReview, // Return the new review to the frontend
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to submit review.' });
  }
});

module.exports = router;
