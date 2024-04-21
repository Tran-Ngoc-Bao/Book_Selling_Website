const express = require('express');
const book = require('../models/book')
const router = express.Router();

const paginateResults = async (model, query, page = 1, limit = 10) => {
  const startIndex = (page - 1) * limit;
  const totalItems = await model.countDocuments(query);
  const totalPages = Math.ceil(totalItems / limit);
  const results = await model.find(query).skip(startIndex).limit(limit);
  return { results, totalPages, totalItems, currentPage: page };
};

router.get('/getall', async (req, res) => {
  try {
    const { page, limit } = req.query;
    const { results, totalPages, totalItems, currentPage } = await paginateResults(book, {}, page, limit);
    res.json({ books: results, pagination: { totalPages, totalItems, currentPage } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  try{
    const findBook = await book.readById(req.params.id);
    if(!findBook){
      return res.status(404).json({message: 'Book not found'});
    }
    res.json(findBook);
  }catch (err){
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});
router.get('/genre/:genre', async (req, res) => {
  try{
    const findBook = await book.readByGenre(req.params.genre);
    if(!findBook){
      return res.status(404).json({message: 'Book not found'});
    }
    res.json(findBook);
  }catch (err){
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
})

router.get('/publishinghouse/:publishinghouseID', async (req, res) => {
  try{
    const findBook = await book.readByPublishingHouseId(req.params.publishinghouseID);
    if(!findBook){
      return res.status(404).json({message: 'Book not found'});
    }
    res.json(findBook);
  }catch (err){
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
})
module.exports = router;