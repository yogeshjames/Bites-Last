
const { authenticateToken } = require('../controllers/Authmiddleware');
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const Hotel = require('../models/Hotel'); 
const User = require('../models/User'); 
const Food = require("../models/Food");
const upload = require("../multer"); // Already initialized Multer
const cloudinary = require("../cloud");
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Order = require('../models/Order'); // Order model

// /Helper function for Cloudinary upload
/*const uploadToCloudinary = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "image", folder },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    stream.end(fileBuffer);
  });
 };*/

 require('dotenv').config();
 router.use(express.json());
 router.use(cookieParser());


// Route to register a new hotel along with food items
router.post("/register", upload.fields([{ name: "hotelImage" }, { name: "foodImages" }]), async (req, res) => {
  // console.log(1);
  const hotelId = uuidv4(); // Generate unique hotel ID
  try {
    // console.log("Request body:", req.body);
// console.log("Request files:", req.files);

    const { owner, hotelName, mobileNumber,password, foodItems } = req.body;
    if (!req.files || !req.files["hotelImage"]) {
      return res.status(400).json({ error: "Hotel image is required" });
    }

    const hotels = await Hotel.findOne({ mobileNumber: mobileNumber});

    if(hotels) return res.status(400).json({error:"Hotel already exists, Try differnt mobile number"})


    // Upload hotel thumbnail image properly
    const hotelImageResult = await cloudinary.uploader.upload(req.files["hotelImage"][0].path, {
      resource_type: "image",
      folder: "bites/hotel_thumbnails",
    });
    console.log("Hotel Image Result:", hotelImageResult);

    const thumbnailImage = hotelImageResult.secure_url; // Get Cloudinary image URL

    // Convert foodItems JSON string to an array (if coming as a string)
    const parsedFoodItems = typeof foodItems === "string" ? JSON.parse(foodItems) : foodItems;
    
    const foodIds = [];
console.log(1);
    if (parsedFoodItems && parsedFoodItems.length > 0) {
      for (let i = 0; i < parsedFoodItems.length; i++) {
        const foodItem = parsedFoodItems[i];

        if (!req.files["foodImages"] || !req.files["foodImages"][i]) {
          return res.status(400).json({ error: `Image missing for food item: ${foodItem.name}` });
        }

        // Upload food image correctly
        const foodImageResult = await cloudinary.uploader.upload(req.files["foodImages"][i].path, {
          resource_type: "image",
          folder: "bites/food_images",
        });

        const foodImageUrl = foodImageResult.secure_url;
        const foodId = uuidv4(); // Generate unique food ID

        // Create food entry in database
        const newFood = new Food({
          id: foodId,
          hotelId: hotelId,  //added extra coz to delte a food item when that hotel is deleted
          name: foodItem.name,
          price: foodItem.price,
          image: foodImageUrl,
        });

        await newFood.save();
        foodIds.push(foodId); // Store the food ID
      }
    }
const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // Create hotel entry in database
    const newHotel = new Hotel({
      hotelId,
      hotelName,
      mobileNumber,
      password : hashedPassword,
      thumbnailImage,
      dishes: foodIds, // Store only food item IDs
    });
console.log(2);
    await newHotel.save();

    res.status(201).json({ message: "Hotel registered successfully", hotelId: hotelId });
  } catch (error) {
    console.error("Error registering hotel:", JSON.stringify(error, null, 2));
    if (hotelId) { 
      try {
        await Food.deleteMany({ hotelId });
        console.log(`Rolled back: Removed all foods associated with hotelId: ${hotelId}`);
      } catch (deleteError) {
        console.error("Error rolling back food entries:", JSON.stringify(deleteError, null, 2));
      }
    } else {
      console.error("hotelId is undefined, unable to delete foods.");
    }
    res.status(500).json({ error: "Internal Server Error" });
  }  
});




router.post('/login' , async (req , res) =>{
console.log("login hit");
const { phone, password } = req.body;
try {
  const hotel = await Hotel.findOne({ mobileNumber: phone });
  if (!hotel) {
    return res.status(404).json({ message: 'Hotel Not Found' });
  }

  const isPasswordValid = await bcrypt.compare(password, hotel.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid password' });
  }
///saving that hotelid inside the token 
  const token = jwt.sign({ hotelId: hotel.hotelId }, process.env.JWT_SECRET1, {
    expiresIn: '1d',
  });

  res.cookie('authToken', token, {
    httpOnly: true,
    secure:false, // Set to true in production (HTTPS)
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
console.log(token);
  res.status(200).json({ message: 'Login successful',hotelId:hotel.hotelId});
} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Server error' });
}
});



/*
// AMBIGOUS SOO COMMENTED
router.get('/getall', async (req, res) => {
    console.log('GET /api/hotel/getall route hit');
  try {

    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const hotelId = decoded.hotelId;

    const hotel = await Hotel.findOne({ hotelId });
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.status(200).json({
      success: true,
      data: hotel,
    });
  } catch (error) {
    console.error('Error fetching hotels:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch hotels. Please try again.',
    });
  }
});
*/




// Route to get all hotels this is for user
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


//hotel details need not need to be protected  for HOTELS  this is
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
    hotel.numberOfUsersRated++;

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


///NEED TO DO SOO MUCH CELAR TOKEN REMOVE ALL ORDERS RELATED WITH THAT HOTEL ID 
// REMOVE ALLL FOOD RELATED WITH HOTEL ID


// FOR HOTELS 
router.delete('/delete/:hotelId', async (req, res) => {
  // Retrieve token from cookies (ensure cookie-parser is set up)
  const token = req.cookies.authToken;
  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET1);
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  
  // Extract hotelId from the route parameters
  const { hotelId } = req.params;
  
  // Ensure the hotelId in the token matches the requested hotelId
  if (decoded.hotelId !== hotelId) {
    return res.status(403).json({ message: 'Not authorized to delete this hotel' });
  }
  
  try {
    // Delete the hotel document
    const hotelDeleted = await Hotel.deleteOne({ hotelId });
    if (hotelDeleted.deletedCount === 0) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    
    // Delete all orders associated with this hotel
    await Order.deleteMany({ hotelId });
    
    // Delete all food items associated with this hotel.
    // Assumes your Food model has a "hotelId" field.
    await Food.deleteMany({ hotelId });
    
    // Clear the auth token cookie
    res.clearCookie("authToken");

    res.status(200).json({ message: 'Hotel, orders, and food items deleted successfully' });
  } catch (error) {
    console.error("Error deleting hotel:", error);
    res.status(500).json({ message: 'Server error while deleting hotel ' });
  }
});


module.exports = router;
