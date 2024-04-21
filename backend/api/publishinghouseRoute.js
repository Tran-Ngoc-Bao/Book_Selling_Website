const express = require('express');
const publishinghouse = require('../models/publishinghouse')
const router = express.Router();

router.get('/getall', async (req, res) => {
  try {
    const publishinghouses = await publishinghouse.find();
    res.json(publishinghouses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;