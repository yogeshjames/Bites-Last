const express = require('express');
const router = express.Router();
const Food = require('../models/Food'); 



router.post('/details', async (req, res) => {
    const { dishIds } = req.body;
    console.log(dishIds)
    try {
      const foods = await Food.find({ id: { $in: dishIds } });
      console.log(foods);
      res.status(200).json({ success: true, data: foods });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error fetching food details.' });
    }
  });
  
module.exports = router;