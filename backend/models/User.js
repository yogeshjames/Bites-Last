const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
  userId: { type: String, default: uuidv4, unique: true },
  name: { type: String, required: true },
  mobile: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rollno: { type: String, required: true },
  hostel: { type: String, required: true },
  room: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);
