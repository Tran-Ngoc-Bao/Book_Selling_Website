const mongoose = require('mongoose')

const publishinghouse = mongoose.model('publishinghouse', {
    bookids: [String],
    email: {
        type: String,
        unique: [true, "email already exists in database!"],
        lowercase: true,
        trim: true,
        required: [true, "email not provided"]
    },
    location: {
        type: String,
        require: [true, "location not provided"]
    },
    name: {
        type: String,
        unique: [true, "name already exists in database!"],
        require: [true, "name not provided"]
    },
    phone: {
        type: String,
        unique: [true, "phone already exists in database!"],
        require: [true, "phone not provided"]
    },
})

// CRUD
publishinghouse.create = (ph) => publishinghouse.collection.insertOne(ph)

publishinghouse.readById = (id) => publishinghouse.findById(id)
publishinghouse.readByEmail = (email) => publishinghouse.findOne({ email })
publishinghouse.readByName = (name) => publishinghouse.findOne({ name })
publishinghouse.readByPhone = (phone) => publishinghouse.findOne({ phone })

publishinghouse.updateBookIds = (id, oldbookid, newbookid) => publishinghouse.updateOne({ _id: id, bookids: oldbookid }, { "bookids.$": newbookid })
publishinghouse.updateEmail = (id, email) => publishinghouse.findByIdAndUpdate(id, { email })
publishinghouse.updateLocation = (id, location) => publishinghouse.findByIdAndUpdate(id, { location })
publishinghouse.updateName = (id, name) => publishinghouse.findByIdAndUpdate(id, { name })
publishinghouse.updatePhone = (id, phone) => publishinghouse.findByIdAndUpdate(id, { phone })

publishinghouse.delete = (id) => publishinghouse.findByIdAndDelete(id)
publishinghouse.deletePlus = (name) => publishinghouse.findOneAndDelete({ name })

// Other query
publishinghouse.addBookId = (id, bookid) => publishinghouse.updateOne({ _id: id }, { $push: { bookids: bookid } })

module.exports = publishinghouse