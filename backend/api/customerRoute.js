const express = require('express');
const customer = require('../models/customer')
const router = express.Router();

router.get('/customers', async (req, res) => {
    try {
      const customers = await customer.find();
      res.json(customers);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
  module.exports = router;