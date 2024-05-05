const express = require('express')
const customerController = require('../controller/customerController')
const auth = require('../service/authenticationService')
const router = express.Router()

router.get('/getall', auth.authAdmins, customerController.getAll)
router.post('/signup', customerController.signUp)
router.post('/login', customerController.logIn)
router.post('/logout', customerController.logOut)
router.put('/update/:id',auth.authBoth, customerController.updateCustomer)
router.delete('/delete/:id',auth.authAdmins, customerController.deleteCustomer)
router.get('/getdetails/:id',auth.authBoth, customerController.getCustomerDetails)
router.get('/cart/:id',auth.authBoth, customerController.getCustomerCart)
router.put('/updateCart/:id',auth.authBoth, customerController.updateCustomerCart)
router.get('/order/:id',auth.authBoth, customerController.getCustomerOrder)
router.post('/refreshtoken', customerController.refreshToken)

module.exports = router