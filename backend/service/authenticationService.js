const jwt = require('jsonwebtoken')
const customer = require('../models/customer')
const admins = require('../models/admins')
const dotenv = require('dotenv')
dotenv.config()

const checkCustomer = async (customerid) => {
    try {
        const user = await customer.findById(customerid)
        return user !== null

    } catch (error) {
        console.error('Error checking customer:', error)
        return false
    }
}
const checkAdmins = async (adminid) => {
    try {
        const admin = await admins.readById(adminid)
        return (admin !== null)
    } catch (error) {
        console.error('Error checking customer:', error)
        return false
    }
}

const authAdmins = (req, res, next) => {
    const token = req.headers.token.split(' ')[0]
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(401).json({
                message: 'The authentication',
                status: 'ERROR'
            })
        }
        else if (checkAdmins(user.id)) {
            next()
        }
        else {
            return res.status(401).json({
                message: 'The authemtication',
                status: 'ERROR'
            })
        }
    })
}
const authCustomer = (req, res, next) => {
    const token = req.headers.token.split(' ')[0]
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(401).json({
                message: 'The authentication',
                status: 'ERROR'
            })
        }
        else if (checkCustomer(user.id)) {
            next()
        }
        else {
            return res.status(401).json({
                message: 'The authemtication',
                status: 'ERROR'
            })
        }
    })
}
const authBoth = (req, res, next) => {
    const token = req.headers.token.split(' ')[0]
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(401).json({
                message: 'The authemtication',
                status: 'ERROR'
            })
        }
        else if (checkAdmins(user.id) || checkCustomer(user.id)) {
            next()
        }
        else {
            return res.status(401).json({
                message: 'The authemtication',
                status: 'ERROR'
            })
        }
    })
}

module.exports = {
    authAdmins,
    authCustomer,
    authBoth,
    checkCustomer,
    checkAdmins
}