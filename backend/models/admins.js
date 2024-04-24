const mongoose = require('mongoose')
const admins = mongoose.model('admins', {
    username:{
        type: String,
        require: [true, "name not provided"]
    },
    password: {
        type: String,
        require: [true, "password not provided"]
    }
})

admins.readById = (id) => admins.findById(id)
admins.readByUsername = (username) => admins.findOne({username})

module.exports = admins