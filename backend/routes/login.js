const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 
const bcrypt = require('bcryptjs');
<<<<<<< HEAD
require('dotenv').config();

=======
const { getIo } = require('../socket');
require('dotenv').config();

const io = getIo();

>>>>>>> feature/socket-integration
const router = express.Router();

// Login route
router.post('/', async (req, res) => {
  const { mobile, password } = req.body;
  try {
    const user = await User.findOne({  mobile: mobile } );
    console.log(mobile);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }
// soo see inside the token im storing the users client id  for this respective token
// soo whenever u decode that token again ever u cna get that repective clients id soo u dont need to use local storage u can get 
//  all thinsg from the toke itself 
    const token = jwt.sign({ id: user.userId }, process.env.JWT_SECRET, {
      expiresIn: '12h',
    });
console.log(token);
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false, ///WHY THIS ??/
    });

<<<<<<< HEAD
=======
    //join room after they sent request 
    io.to(user.userId.toString()).emit('joinClientRoom', user.userId.toString());
>>>>>>> feature/socket-integration
    res.status(200).json({
      message: 'Login successful',
      clientId: user.userId, 
      
    });
<<<<<<< HEAD
    console.log(2);
=======
    // console.log(2);
>>>>>>> feature/socket-integration
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



////sign out
router.post("/signout", (req, res) => {
  // Clear the  token cookie.
  res.clearCookie("token", {
    httpOnly: true,
    secure: false, // true in production
    sameSite: "lax",
  });
  res.status(200).json({ message: "Sign out successful" });
});




module.exports = router;
