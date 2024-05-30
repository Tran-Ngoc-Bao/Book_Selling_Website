const jwt = require('../service/jwtService')
const customer = require('../models/customer')
const book = require('../models/book')
const admins = require('../models/admins')
const { checkAdmins } = require('../service/authenticationService')
// const config = require('config');
// const dateFormat = require('dateformat');


const getAll = async (req, res) => {
    try {
        const customers = await customer.find()
        res.json(customers)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server Error' })
    }
}
const signUp = async (req, res) => {
    try {
        const { address, bank, birthday, cart, email, gender, name, order, password, phone } = req.body

        const existingEmail = await customer.readByEmail(email)
        const existingPhone = await customer.readByPhone(phone)

        if (existingEmail) {
            return res.status(400).json({ message: 'Email already exists' })
        } else if (existingPhone) {
            return res.status(400).json({ message: 'Phone numbers already exists' })
        } else {
            const newCustommers = await customer.create(req.body)
            res.status(201).json(newCustommers)
        }
    }
    catch (error) {
        console.error('Error creating user:', error)
        res.status(500).json({ message: 'Server Error' })
    }
}
const logIn = async (req, res) => {
    try {
        const { username, email, phone, password } = req.body

        let existingCustomer, existingAdmin, isAdmin

        if (email) {
            existingCustomer = await customer.readByEmail(email)
        } else if (phone) {
            existingCustomer = await customer.readByPhone(phone)
        } else {
            existingAdmin = await admins.readByUsername(username)
        }
        if (!existingCustomer && !existingAdmin) {
            return res.status(400).json({ message: 'Username or password is incorrect' })
        } else {
            if (existingCustomer) {
                if (existingCustomer.password !== password) {
                    return res.status(400).json({ message: 'Password is incorrect' })
                } else {
                    isAdmin = await checkAdmins(existingCustomer._id)
                    const accessToken = await jwt.gennerateAccessToken({ id: existingCustomer._id, isAdmin })
                    const refreshToken = await jwt.gennerateRefreshToken({ id: existingCustomer._id, isAdmin })

                    res.cookie('refreshToken', refreshToken, {
                        httpOnly: true,
                        secure: false,
                        sameSite: 'strict',
                        path: '/',
                    })
                    res.json({ message: 'Login successful', existingCustomer, customerId: existingCustomer._id, accessToken, refreshToken })
                }
            } else if (existingAdmin) {
                if (existingAdmin.password !== password) {
                    return res.status(400).json({ message: 'Password is incorrect' })
                } else {
                    isAdmin = await checkAdmins(existingAdmin._id)
                    const accessToken = await jwt.gennerateAccessToken({ id: existingAdmin._id, isAdmin })
                    const refreshToken = await jwt.gennerateRefreshToken({ id: existingAdmin._id, isAdmin })

                    res.cookie('refreshToken', refreshToken, {
                        httpOnly: true,
                        secure: false,
                        sameSite: 'strict',
                        path: '/',
                    })
                    res.json({ message: 'Login successful', existingAdmin, customerId: existingAdmin._id, accessToken, refreshToken })
                }
            }
        }
    } catch (error) {
        console.error('Error logging in:', error)
        res.status(500).json({ message: 'Server Error' })
    }
}
const logOut = async (req, res) => {
    try {
        res.clearCookie('refreshToken');
        res.status(200).json({ message: 'Log out successfully' })
    } catch (error) {
        console.error('Error logging out:', error)
        res.status(500).json({ message: 'Server Error' })
    }
}
const updateCustomer = async (req, res) => {
    try {
        const customerID = req.params.id
        const updateField = req.body
        const existingCustomer = await customer.readById(customerID)
        if (!existingCustomer) {
            return res.status(400).json({ message: 'Customer not found' })
        }
        else {
            const checkPhone = await customer.readByPhone(updateField.phone)
            const checkEmail = await customer.readByEmail(updateField.email)
            if (checkPhone || checkEmail) {
                return res.status(200).json({ message: 'Phone numbers or email already exists ' })
            } else {
                await customer.findByIdAndUpdate(customerID, updateField)
                const updatedCustomer = await customer.readById(customerID)
                res.json({ message: 'updated successfully', customerid: customerID, updatedCustomer })
            }
        }
    } catch (error) {
        console.error('Error updating customer:', error)
        res.status(500).json({ message: 'Server Error' })
    }
}
const deleteCustomer = async (req, res) => {
    try {
        const customerId = req.params.id
        const existingCustomer = customer.readById(customerId)
        if (!existingCustomer) {
            res.status(404).json({ message: 'Customer not found' })
        } else {
            await customer.delete(customerId)
            res.status(200).json({ message: 'Delete customer successfully' })
        }
    } catch (error) {
        console.error('Error deleting customer:', error)
        res.status(500).json({ message: 'Server Error' })
    }
}
const getCustomerDetails = async (req, res) => {
    try {
        const customerId = req.params.id
        const details = await customer.readById(customerId)
        res.status(200).json(details)
    } catch (error) {
        console.error('Error getting details:', error)
        res.status(500).json({ message: 'Server Error' })
    }
}
const getCustomerCart = async (req, res) => {
    try {
        const customerId = req.params.id
        const customerCart = await customer.readById(customerId)
        res.json(customerCart.cart)
    } catch (error) {
        console.error('Error getting cart:', error)
        res.status(500).json({ message: 'Server Error' })
    }
}
const addToCart = async (req, res) => {
    try {
        const customerID = req.params.id
        const newCart = req.body
        const data = newCart.cart
        oldCart = await customer.readById(customerID)
        if (oldCart.cart == null) {
            await customer.findByIdAndUpdate(customerID, newCart)
        } else {
            await customer.addCart(customerID, data)
        }
        const newCustomerCart = await customer.readById(customerID)
        res.status(200).json({ message: 'Updated successfully', newCart: newCustomerCart.cart })
    } catch (error) {
        console.error('Error updatting cart:', error)
        res.status(500).json({ message: 'Server Error' })
    }
}
const getCustomerOrder = async (req, res) => {
    try {
        const customerId = req.params.id
        const customerOrder = await customer.readById(customerId)
        res.json(customerOrder.order)
    } catch (error) {
        console.error('Error getting order:', error)
        res.status(500).json({ message: 'Server Error' })
    }
}
const addToOrder = async (req, res) => {
    try {
        const customerID = req.params.id
        const newOrder = req.body
        const data = newOrder.order
        let updatingCustomer = await customer.readById(customerID)
        if (updatingCustomer.order == null) {
            await customer.findByIdAndUpdate(customerID, newOrder)
        } else {
            await customer.addOrder(customerID, data)
        }
        updatingCustomer = await customer.readById(customerID)
        data.forEach(async (order) => {
            let currentBook = await book.readById(order.bookid)
            let num = currentBook.quantity
            num = num - order.quantity
            currentBook.quantity = num
            await currentBook.save()
        })
        res.status(200).json({ message: 'Updated successfully', newOrder: updatingCustomer.order })
    } catch (error) {
        console.error('Error updatting order:', error)
        res.status(500).json({ message: 'Server Error' })
    }
}
const getAllOrder = async (req, res) => {
    try {
        const customers = await customer.find({});
        let allOrders = [];

        customers.forEach(customer => {
            allOrders = allOrders.concat(customer.orders);
        });
        res.status(200).json({ message: 'Get all orders successfully', Order: allOrders })
    } catch (error) {
        console.error('Error fetching orders:', error)
        res.status(500).json({ message: 'Server Error' })
    }

}
const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refreshToken
        if (!token) {
            res.status(200).json({ message: 'The token is required' })
        } else {
            const refreshing = await jwt.refreshToken(token)
            res.status(200).json(refreshing)
        }
    } catch (error) {
        console.error('Error refreshing token:', error)
        res.status(500).json({ message: 'Server Error' })
    }
}

module.exports = {
    getAll,
    signUp,
    logIn,
    logOut,
    updateCustomer,
    deleteCustomer,
    getCustomerDetails,
    getCustomerCart,
    addToCart,
    getCustomerOrder,
    addToOrder,
    getAllOrder,
    refreshToken
}