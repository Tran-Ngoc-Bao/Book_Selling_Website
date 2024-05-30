const express = require('express')
const bookController = require('../controller/booksController')
const auth = require('../service/authenticationService')
const router = express.Router()

router.get('/getall', bookController.getAll)
router.get('/getone/:id', bookController.getOne)
router.get('/getallgenres', bookController.getAllGenres)
router.post('/admin/create', auth.authAdmins, bookController.createBook)
router.put('/update/:id', auth.authBoth, bookController.updateBook)
router.delete('/admin/delete/:id', auth.authAdmins, bookController.deleteBook)
router.put('/addNewFeedback/:id', auth.authBoth, bookController.addNewFeedBack)
router.get('/searchbook', bookController.searchBook)
router.post('/uploadimages', bookController.upload.single('image'), bookController.uploadImage)

module.exports = router