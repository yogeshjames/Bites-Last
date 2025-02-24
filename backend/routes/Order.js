const { authenticateToken } = require('../controllers/Authmiddleware');
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const Hotel = require('../models/Hotel'); 
const Food = require("../models/Food");
const Order = require('../models/Order'); // Order model
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.use(express.json());

 router.use(cookieParser());

 ///order id genrator
 function generateShortId() {
  const timestampPart = Date.now().toString().slice(-4); // Last 4 digits
  const randomPart = Math.floor(Math.random() * 100).toString().padStart(2, '0');
  return parseInt(timestampPart + randomPart); // Example: 1716 (timestamp) + 45 → 171645
}


router.post("/checkout", authenticateToken, async (req, res) => {
  // Log headers, cookies, and body for debugging
//   console.log("Headers:", req.headers);
  console.log("Cookies:", req.cookies);
  console.log("Request body:", req.body);

  try {
    const { cartItems, total, restaurantId } = req.body;
    if (!cartItems || !total || !restaurantId) {
      return res.status(400).json({ message: "Missing required fields: cartItems, total, or restaurantId" });
    }

    // Verify that the restaurant exists
    const hotel = await Hotel.findOne({ hotelId: restaurantId });
    if (!hotel) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // Recalculate the total price on the server and validate each cart item
    let recalculatedTotal = 0;
    for (const item of cartItems) {
      // Check that the food item exists
      const food = await Food.findOne({ id: item.id });
      if (!food) {
        return res.status(404).json({ message: `Food item with id ${item.id} not found` });
      }
      // Check that the restaurant serves this food item
      if (!hotel.dishes.includes(item.id)) {
        return res.status(400).json({ message: `Food item with id ${item.id} is not served by this restaurant` });
      }
      recalculatedTotal += food.price * item.quantity;
    }
    
    // Compare the recalculated total with the client provided total
    if (recalculatedTotal !== total) {
      return res.status(400).json({ message: "Total price mismatch. Please refresh your cart and try again." });
    }
    
    //  Get the clientId from the authenticated token (assuming authenticateToken sets req.user)
    // console.log(req.user);
    const clientId = req.user  && req.user.id;
    // console.log(req.user);
    if (!clientId) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    
    // Create a new order document
    const orderId = await generateShortId();
    const newOrder = new Order({
      orderId,
      hotelId: restaurantId,
      clientId,
      // We store only the item id, name, price, and quantity for each cart item.
      cartItems: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      totalPrice: recalculatedTotal,
      status: "Waiting", // Initial status
    });
    
    await newOrder.save();
    
    return res.status(200).json({ message: "Order placed successfully", orderId });
  } catch (error) {
    console.error("Checkout error:", error);
    return res.status(500).json({ message: "Server error while processing your order" });
  }
});



router.get("/user-orders", authenticateToken, async (req, res) => {
    try {
      const clientId = req.user.id;
      console.log(req.user);
      if (!clientId) {
        return res.status(401).json({ message: "User not authenticated" });
      }
  
      // Fetch all orders placed by this client
      const orders = await Order.find({ clientId }).sort({ createdAt: -1 });
  
      // Fetch hotel details for each order
      const ordersWithHotelInfo = await Promise.all(
        orders.map(async (order) => {
          const hotel = await Hotel.findOne({ hotelId: order.hotelId });
  
          return {
            orderId: order.orderId,
            hotelName: hotel ? hotel.hotelName : "Unknown Restaurant",
            hotelContact: hotel ? hotel.mobileNumber : "N/A",
            cartItems: order.cartItems,
            totalPrice: order.totalPrice,
            status: order.status,
            createdAt: order.createdAt,
          };
        })
      );
  
      return res.status(200).json({ orders: ordersWithHotelInfo });
    } catch (error) {
      console.error("Error fetching user orders:", error);
      return res.status(500).json({ message: "Server error while fetching orders" });
    }
  });
  
  

///update orders FOR HOTEL 
router.patch('/update/:orderId',  async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status: newStatus } = req.body;
  
      // Find and update the order
      const updatedOrder = await Order.findOneAndUpdate(
        { orderId: orderId }, // Query by the custom orderId field
        { status: newStatus },
        { new: true, runValidators: true }
      );
      
      if (!updatedOrder) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }
      const hotelId=updatedOrder.hotelId;

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
          if (decoded.hotelId !== hotelId) {
            return res.status(403).json({ message: 'Not authorized ' });
          }

      res.status(200).json({
        success: true,
        message: 'Order status updated successfully',
        data: updatedOrder
      });
  
    } catch (error) {
      console.error('Error updating order:', error);
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message
      });
    }
  });


//for hotels page to display thier orders
router.get("/hotel/:hotelId", async (req, res) => {
    try {
        const { hotelId } = req.params;
////isntead of authtoke for hotels seperately i do here itsle f
// console.log(req.cookies);
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
  console.log(decoded, hotelId);
      if (decoded.hotelId !== hotelId) {
        return res.status(403).json({ message: 'Not authorized ' });
      }

     // Fetch all orders for the given hotelId, sorted with latest orders first.
     const orders = await Order.find({ hotelId }).sort({ createdAt: -1 });
    
     // For each order, augment with hotel info and client details.
     const ordersWithHotelInfo = await Promise.all(
       orders.map(async (order) => {
         const hotel = await Hotel.findOne({ hotelId: order.hotelId });
         // Use the clientId from the order to fetch the user details.
         const user = await User.findOne({ userId: order.clientId });
         let clientPhone = "N/A";
         let clientAddress = "N/A";
         if (user) {
           clientPhone = user.mobile || "N/A";
           // Create address from hostel and room
           clientAddress = `${user.hostel ? user.hostel : ""}${user.room ? ", Room " + user.room : ""}`.trim();
           if (!clientAddress) clientAddress = "N/A";
         }
         return {
           orderId: order.orderId,
           hotelName: hotel ? hotel.hotelName : "Unknown Restaurant",
           hotelContact: hotel ? hotel.mobileNumber : "N/A",
           cartItems: order.cartItems,
           totalPrice: order.totalPrice,
           status: order.status,
           createdAt: order.createdAt,
           clientPhone,
           clientAddress,
         };
       })
     );
     
     return res.status(200).json({ orders: ordersWithHotelInfo });
   } catch (error) {
     console.error("Error fetching orders:", error);
     return res.status(500).json({ message: "Server error while fetching orders" });
   }
 });


module.exports = router;
