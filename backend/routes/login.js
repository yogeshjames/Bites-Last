const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 
const bcrypt = require('bcrypt');
require('dotenv').config();

const router = express.Router();

// Login route
router.post('/', async (req, res) => {
  const { mobile, password } = req.body;
  try {
    const user = await User.findOne({ mobile });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '12h',
    });
console.log(token);
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false, ///WHY THIS ??/
    });

    res.status(200).json({
      message: 'Login successful',
      clientId: user.userId, 
      
    });
    console.log(2);
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
