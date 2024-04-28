const express = require('express')
const publishinghouseController = require('../controller/publishinghouseController')
const auth = require('../service/authenticationService')
const router = express.Router()

router.post('/admin/create', publishinghouseController.createPublishinghouse)
router.get('/getall', publishinghouseController.getAllPublishinghouse)
router.get('/getdetail/:id', publishinghouseController.getPublishinhghouseDetails)
router.put('/admin/update/:id', auth.authAdmins, publishinghouseController.updatePublishinghouse)
router.delete('/admin/delete',auth.authAdmins,publishinghouseController.deletePublishinghouse )
router.post('/admin/sentorder/:id', auth.authAdmins, publishinghouseController.sentOrder)

module.exports = router