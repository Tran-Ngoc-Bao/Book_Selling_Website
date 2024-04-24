const mongoose = require('mongoose')

const book = mongoose.model('book', {
    authors: {
        type: [String],
        require: [true, "authors not provided"]
    },
    description: String,
    feedbacks: [{
        customerid: {
            type: String,
            require: [true, "customerid not provided"]
        },
        rate: {
            type: Number,
            require: [true, "rate not provided"]
        },
        text: String,
        time: {
            type: Date,
            default: Date.now
        }
    }],
    genres: {
        type: [String],
        require: [true, "genres not provided"]
    },
    price: {
        type: Number,
        require: [true, "price not provided"]
    },
    publishinghouseid: {
        type: String,
        require: [true, "publishinghouseid not provided"]
    },
    quantity: {
        type: Number,
        require: [true, "quantity not provided"]
    },
    rate: Number,
    sold: Number,
    title: {
        type: String,
        require: [true, "title not provided"]
    },
    year: {
        type: Number,
        require: [true, "year not provided"]
    }
})

// CRUD
book.create = (b) => book.collection.insertOne(b)

book.readById = (id) => book.findById(id)

book.updateAuthors = (id, oldauthor, newauthor) => book.updateOne({ _id: id, authors: oldauthor }, { "authors.$": newauthor })
book.updateDescription = (id, description) => book.findByIdAndUpdate(id, { description })
book.updateFeedbacks = (id, oldfeedback, newfeedback) => book.updateOne({ _id: id, feedbacks: oldfeedback }, { "feedbacks.$": newfeedback })
book.updateGenres = (id, oldgenre, newgenre) => book.updateOne({ _id: id, genres: oldgenre }, { "genres.$": newgenre })
book.updatePrice = (id, price) => book.findByIdAndUpdate(id, { price })
book.updatePublishingHouseId = (id, publishinghouseid) => book.findByIdAndUpdate(id, { publishinghouseid })
book.updateQuantity = (id, quantity) => book.findByIdAndUpdate(id, { quantity })
book.updateRate = (id, rate) => book.findByIdAndDelete(id, { rate })
book.updateSold = (id, sold) => book.findByIdAndUpdate(id, { sold })
book.updateTitle = (id, title) => book.findByIdAndUpdate(id, { title })
book.updateYear = (id, year) => book.findByIdAndUpdate(id, { year })

book.delete = (id) => book.findByIdAndDelete(id)

// Other query
book.readByName = (name) => book.find({ name })
book.readByGenre = (genre) => book.find({ genres: genre })
book.readByPublishingHouseId = (publishinghouseid) => book.find({ publishinghouseid })

book.addAuthor = (id, author) => book.updateOne({ _id: id }, { $push: { authors: author } })
book.addFeedBack = (id, feedback) => book.updateOne({ _id: id }, { $push: { feedbacks: feedback } })
book.addGenre = (id, genre) => book.updateOne({ _id: id }, { $push: { genres: genre } })

book.sortBySold = () => book.aggregate([{ $sort: { sold: -1 } }])
book.sortByRate = () => book.aggregate([{ $sort: { rate: -1 } }])

book.sortBySoldWithGenre = ({ genres: genre }) => book.find({ genres: genre }).sort({ sold: -1 })
book.sortBySoldWithPublishingHouse = (publishinghouseid) => book.find({ publishinghouseid }).sort({ sold: -1 })

book.sortByRateWithGenre = ({ genres: genre }) => book.find({ genres: genre }).sort({ rate: -1 })
book.sortByRateWithPublishingHouse = (publishinghouseid) => book.find({ publishinghouseid }).sort({ rate: -1 })

module.exports = book