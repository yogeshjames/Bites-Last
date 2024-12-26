const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

// Middleware to authenticate token from cookie
function authenticateToken(req, res, next) {
  const token = req.cookies.token; 
  console.log(token);// Retrieve token from cookies
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token found' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Invalid token' });
    }
    req.user = user; 
    next();
  });
}

// Verify token route (used by frontend to check auth status)
router.get('/verifyToken', authenticateToken, (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});

// Logout Route - Clears the HTTP-only cookie
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ success: true, message: 'Logged out successfully' });
});

module.exports = router;
