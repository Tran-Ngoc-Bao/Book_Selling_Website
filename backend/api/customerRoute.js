const express = require('express');
const customer = require('../models/customer')
const router = express.Router();

router.get('/getall', async (req, res) => {
  try {
    const customers = await customer.find();
    res.json(customers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/signup', async (req, res) => {
  try {
    const { email, phone } = req.body;

    const existingEmail = await customer.readByEmail(email);
    const existingPhone = await customer.readByPhone(phone);

    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    } else if (existingPhone) {
      return res.status(400).json({ message: 'Phone number already exists' });
    } else {
      const newCustommers = await customer.create(req.body);
      res.status(201).json(newCustommers);
    }
  }
  catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { phone, password } = req.body;

    const existingCustomer = await customer.readByPhone(phone);
    if (!existingCustomer) {
      return res.status(400).json({ message: 'Phone number or password is incorrect' });
    } else if (existingCustomer.password !== password) {
      return res.status(400).json({ message: 'Phone number or password is incorrect' });
    } else {
      res.json({ message: 'Login successful' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Server Error' });
  }

})

module.exports = router;