const express = require('express')
const paymentsController = require('../controller/paymentsController')
const auth = require('../service/authenticationService')
const router = express.Router()

router.post('/create_payment_url', paymentsController.createPaymentURL)

module.exports = router