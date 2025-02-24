
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to authenticate token from cookie
function authenticateToken(req, res, next) {
  const token = req.cookies.token;
  console.log(token); // Retrieve token from cookies

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token found,login again' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}

module.exports = { authenticateToken };
