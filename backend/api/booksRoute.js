const express = require('express')
const bookController = require('../controller/booksController')
const auth = require('../service/authenticationService')
const router = express.Router()

router.get('/getall', bookController.getAll)
router.get('/:id', bookController.getOne)
router.get('/genre/:genre', bookController.getByGenre)
router.get('/publishinghouse/:publishinghouseid', bookController.getByPublishinghouse)
router.post('/admin/create', auth.authAdmins, bookController.createBook)
router.put('/update/:id', auth.authBoth, bookController.updateBook)
router.delete('/admin/delete/:id', auth.authAdmins, bookController.deleteBook)

module.exports = router