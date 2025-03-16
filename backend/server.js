const express = require('express');
<<<<<<< HEAD
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS
=======
const http = require('http'); // Required to attach Socket.IO to an HTTP server
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS
const { initIo } = require('./socket');
const app = express();
const server = http.createServer(app);

initIo(server);
>>>>>>> feature/socket-integration
const cookieParser = require('cookie-parser'); // Import cookie-parser
const Register = require('./routes/register');
const Auth = require('./controllers/Auth'); // Token verification routes
const Login = require('./routes/login');
const HotelRoutes = require('./routes/Hotel');
const FoodRoutes = require('./routes/Food');
const OrderRoutes = require('./routes/Order');
const Hotel = require('./models/Hotel');
const Food = require('./models/Food');
<<<<<<< HEAD
const app = express();
const PORT = process.env.PORT || 5000;
require('dotenv').config();

=======
const PORT = process.env.PORT || 5000;
require('dotenv').config();

//change url in prod
>>>>>>> feature/socket-integration
////CORS CHANGE IN PROD
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'http://localhost:3001',
<<<<<<< HEAD
    'https://your-production-domain.com'
=======
    'https://your-production-domain.com'////prod domain
>>>>>>> feature/socket-integration
  ],
  credentials: true
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


// Routes
app.use('/api/user', Register);         // User registration
app.use('/api/user/login', Login);      // User login
app.use('/api/auth', Auth);             // Token verification & logout
app.use('/api/hotel', HotelRoutes);     // Hotel routes
app.use('/api/food', FoodRoutes); 
app.use('/api/orders',OrderRoutes)
// Start the server
<<<<<<< HEAD
app.listen(PORT, () => {
=======
server.listen(PORT, () => {
>>>>>>> feature/socket-integration
  console.log(`Server running on http://localhost:${PORT}`);
});
