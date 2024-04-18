const mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectId

const customer = mongoose.model('customer', {
    address: {
        type: String,
        require: [true, "address not provided"]
    },
    bank: {
        name: {
            type: String,
            require: [true, "name not provided"]
        },
        seri: {
            type: String,
            require: [true, "seri not provided"]
        }
    },
    birthday: {
        type: Date,
        require: [true, "birthday not provided"]
    },
    cart: [{
        bookid: {
            type: String,
            require: [true, "bookid not provided"]
        },
        quantity: {
            type: Number,
            require: [true, "quantity not provided"]
        },
    }],
    email: {
        type: String,
        unique: [true, "email already exists in database!"],
        lowercase: true,
        trim: true,
        required: [true, "email not provided"]
    },
    gender: {
        type: String,
        require: [true, "gender not provided"]
    },
    name: {
        type: String,
        require: [true, "name not provided"]
    },
    order: [{
        bookid: {
            type: String,
            require: [true, "bookid not provided"]
        },
        quantity: {
            type: Number,
            require: [true, "quantity not provided"]
        },
        shipprice: {
            type: Number,
            require: [true, "shipprice not provided"]
        },
        status: {
            type: String,
            require: [true, "status not provided"]
        }
    }],
    password: {
        type: String,
        require: [true, "password not provided"]
    },
    phone: {
        type: String,
        unique: [true, "phone already exists in database!"],
        require: [true, "phone not provided"]
    },
})

// CRUD
customer.create = (c) => customer.collection.insertOne(c)

customer.readById = (id) => customer.findById(id)
customer.readByEmail = (email) => customer.findOne({ email })
customer.readByPhone = (phone) => customer.findOne({ phone })

customer.updateAddress = (id, address) => customer.findByIdAndUpdate(id, { address })
customer.updateBank = (id, newbank) => customer.findByIdAndUpdate(id, { bank: newbank })
customer.updateBirthday = (id, birthday) => customer.findByIdAndUpdate(id, { birthday })
customer.updateCart = (id, oldcart, newcart) => customer.updateOne({ _id: id, cart: oldcart }, { "cart.$": newcart })
customer.updateEmail = (id, email) => customer.findByIdAndUpdate(id, { email })
customer.updateGender = (id, gender) => customer.findByIdAndUpdate(id, { gender })
customer.updateName = (id, name) => customer.findByIdAndUpdate(id, { name })
customer.updateOrder = (id, oldorder, neworder) => customer.updateOne({ _id: id, order: oldorder }, { "order.$": neworder })
customer.updatePassword = (id, password) => customer.findByIdAndUpdate(id, { password })
customer.updatePhone = (id, phone) => customer.findByIdAndUpdate(id, { phone })

customer.delete = (id) => customer.findByIdAndDelete(id)

// Other query
customer.addCart = (id, newcart) => customer.updateOne({ _id: id }, { $push: { cart: newcart } })
customer.addOrder = (id, neworder) => customer.updateOne({ _id: id }, { $push: { order: neworder } })

customer.readByOrderId = (id) => customer.findOne({ "order.orderid": new ObjectId(id) })

module.exports = customer