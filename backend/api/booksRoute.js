const express = require('express')
const bookController = require('../controller/booksController')
const router = express.Router()

router.get('/getall', bookController.getAll)
router.get('/:id', bookController.getOne)
router.get('/genre/:genre', bookController.getByGenre)
router.get('/publishinghouse/:publishinghouseid', bookController.getByPublishinghouse)
router.post('/create', bookController.createBook)
router.put('/update/:id',bookController.updateBook)
router.delete('/delete/:id', bookController.deleteBook)

module.exports = router