const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS
const cookieParser = require('cookie-parser'); // Import cookie-parser
const Register = require('./routes/register');
const Auth = require('./controllers/Auth'); // Token verification routes
const Login = require('./routes/login');
const HotelRoutes = require('./routes/Hotel');
const FoodRoutes = require('./routes/Food');
const Hotel = require('./models/Hotel');
const Food = require('./models/Food');
const app = express();
const PORT = process.env.PORT || 5000;
require('dotenv').config();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL  change while
  credentials: true,              // Allow cookies
}));
app.use(express.json());
app.use(cookieParser());          // Enable cookie parsing

// Serve hotel thumbnail images
app.use('/uploads', express.static('uploads'));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Initialize database for testing (remove in production)
const db = mongoose.connection;
db.once('open', async () => {
  console.log('Database connected');
  const existingHotels = await Hotel.countDocuments();
  if (existingHotels === 0) {
    // Create a hotel with a sample review
    await Hotel.create({
      hotelId: 'H0001',
      hotelName: 'Placeholder Hotel',
      currentRating: 0,
      numberOfUsersRated: 0,
      dishes: ['F001'],
      thumbnailImage: "uploads/H1000.jpg",
      reviews: [
        {
          user: 'John Doe',
          comment: 'Great experience, would stay again!',
          rating: 5,
        },
        {
          user: 'Jane Smith',
          comment: 'Nice hotel but could use more amenities.',
          rating: 3,
        },
        {
          user: 'Emily Davis',
          comment: 'Had a pleasant stay, clean rooms.',
          rating: 4,
        }
      ], // Added reviews here for testing
    });

    console.log('Initialized hotels collection with a placeholder document and test reviews');
  } else {
    console.log('Hotels collection already initialized');
  }
});

const newFood = new Food({
  id: 'F001', // Custom id for food item
  name: 'Pasta',
  price: 15,
  image: 'path/to/pasta.jpg',
  tag: 'Main Course',
});

newFood.save()
  .then(() => console.log('Food item saved'))
  .catch(err => console.log('Error saving food item:', err));



// Routes
app.use('/api/user', Register);         // User registration
app.use('/api/user/login', Login);      // User login
app.use('/api/auth', Auth);             // Token verification & logout
app.use('/api/hotel', HotelRoutes);     // Hotel routes
app.use('/api/food', FoodRoutes); 
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
