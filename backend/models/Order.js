const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  orderId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  hotelId: { 
    type: String, 
    required: true 
  },
  // or store client details directly here.
  clientId: { 
    type: String, 
    required: true 
  },
//   clientDetails: {
//     name: { type: String, required: true },
//     phone: { type: String, required: true },
//     address: { type: String, required: true }
//   },
  cartItems: [{
    id: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
  }],
  totalPrice: { 
    type: Number, 
    required: true 
  },
  status: {
    type: String,
    enum: ["Waiting", "Accepted", "Cancelled"],
    default: "Waiting"
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Order', OrderSchema);
