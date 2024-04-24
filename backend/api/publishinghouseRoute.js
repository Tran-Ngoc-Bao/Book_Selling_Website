const express = require('express')
const publishinghouseController = require('../controller/publishinghouseController')
const auth = require('../service/authenticationService')
const router = express.Router()

router.post('/create', publishinghouseController.createPublishinghouse)
router.get('/getall', publishinghouseController.getAllPublishinghouse)
router.get('/getdetail/:id', publishinghouseController.getPublishinhghouseDetails)
router.put('/update/:id', auth.authAdmins, publishinghouseController.updatePublishinghouse)
router.post('/sentorder/:id', auth.authAdmins, publishinghouseController.sentOrder)

module.exports = router