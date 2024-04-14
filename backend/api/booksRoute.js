const express = require('express');
const book = require('../models/book')
const router = express.Router();

router.get('/books', async (req, res) => {
    try {
      const books = await book.find();
      res.json(books);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
  module.exports = router;