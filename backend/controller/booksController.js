const multer = require('multer');
const path = require('path');
const fs = require('fs');
const book = require('../models/book')

const paginateResults = async (query, p = 1, limit = 12, sortBy) => {
    const startIndex = (p - 1) * limit
    const totalItems = await book.countDocuments(query)
    const totalPages = Math.ceil(totalItems / limit)
    const results = await book.find(query).skip(startIndex).limit(limit).sort(sortBy)
    return { results, totalPages, totalItems, currentPage: p }
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = path.join(__dirname, '../images');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        const productId = req.body.productId
        cb(null, `${productId}.jpeg`)
    }
})
const upload = multer({ storage: storage })
const getAll = async (req, res) => {
    try {
        let query = {}
        if (req.query.genre) {
            const genres = req.query.genre.split(',')
            query.genres = { $in: genres }
        }
        if (req.query.publishinghouseid) {
            query.publishinghouseid = req.query.publishinghouseid
        }
        let { p, limit, sortBy } = req.query
        const sort = req.query.sortBy ? req.query.sortBy.split(',') : []
        if (sort.includes('sold')) {
            sortBy = { sold: -1 }
        }
        if (sort.includes('rate')) {
            sortBy = { rate: -1 }
        }
        const { results, totalPages, totalItems, currentPage } = await paginateResults(query, p, limit, sortBy)
        res.json({ books: results, pagination: { totalPages, totalItems, currentPage } })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server Error' })
    }
}
const getOne = async (req, res) => {
    try {
        const bookId = req.params.id
        const findBook = await book.readById(bookId)
        if (!findBook) {
            return res.status(404).json({ message: 'Book not found' })
        }
        res.json(findBook)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server Error' })
    }
}
const getAllGenres = async (req, res) => {
    try {
        const genres = await book.aggregate([
            { $unwind: "$genres" },
            { $group: { _id: null, uniqueGenres: { $addToSet: "$genres" } } },
            { $project: { _id: 0, uniqueGenres: 1 } },
            { $sort: { uniqueGenres: 1 } }
        ]);
        if (genres.length === 0) {
            return res.status(404).json({ message: 'No genres found' })
        }
        res.status(200).json(genres[0].uniqueGenres)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const createBook = async (req, res) => {
    try {
        const { authors, description, feedbacks, genres, price, publishinghouseid, quantity, rate, sold, title, year } = req.body
        const newBook = await book.create(req.body)
        res.status(201).json(newBook)

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server Error' })
    }

}
const updateBook = async (req, res) => {
    const bookID = req.params.id
    const updateField = req.body
    try {
        const existingBook = await book.readById(bookID)
        if (!existingBook) {
            return res.status(400).json({ message: 'Book not found' })
        }
        else {
            await book.findByIdAndUpdate(bookID, updateField)
            const updatedBook = await book.readById(bookID)
            res.json({ message: 'Updated successfully', bookid: bookID, updatedBook })

        }
    } catch (error) {
        console.error('Error updating book:', error)
        res.status(500).json({ message: 'Server Error' })
    }
}
const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No image uploaded.');
        }
        else {
            res.status(200).json({ message: 'File uploaded successfully.' });
        }

    } catch (error) {
        console.error('Error uploading image:', error)
        res.status(500).json({ message: 'Server Error' })
    }

}
const deleteBook = async (req, res) => {
    try {
        const bookID = req.params.id
        await book.delete(bookID)
        res.status(200).json({ message: 'Delete book successfully' })
    } catch (error) {
        console.error('Error deleting book:', error)
        res.status(500).json({ message: 'Server Error' })
    }
}
const addNewFeedBack = async (req, res) => {
    try {
        const bookID = req.params.id
        const newFeedback = req.body
        let currentBook = await book.readById(bookID)
        if (currentBook.feedbacks == null) {
            const updateFeedbacks = {
                "feedbacks": newFeedback
            }
            await book.findByIdAndUpdate(bookID, updateFeedbacks)
        }
        else {
            await book.addFeedBack(bookID, newFeedback)
        }
        currentBook = await book.readById(bookID)
        const totalRates = currentBook.feedbacks.reduce((sum, feedback) => sum + feedback.rate, 0)
        const averageRate = totalRates / currentBook.feedbacks.length
        const roundedRate = Math.round(averageRate * 2) / 2
        currentBook.rate = roundedRate
        await currentBook.save()
        res.status(200).json({ message: 'Added feedback successfully', feedbacks: currentBook.feedbacks })
    } catch (error) {
        console.error('Error adding feedback:', error)
        res.status(500).json({ message: 'Server Error' })
    }
}
const searchBook = async (req, res) => {
    try {
        const searchTerm = req.query.searchterm
        if (!searchTerm) {
            return res.status(404).json({ message: 'Search erm is required' })
        }
        const searchItems = await book.find({ title: { $regex: searchTerm, $options: 'i' } })
        if (!searchItems) {
            return res.status(404).json({ message: 'Book not found' })
        }
        res.status(200).json(searchItems)
    } catch (error) {
        console.error('Error searching book:', error)
        res.status(500).json({ message: 'Server Error' })
    }
}
module.exports = {
    getAll,
    getOne,
    getAllGenres,
    createBook,
    updateBook,
    upload,
    uploadImage,
    deleteBook,
    addNewFeedBack,
    searchBook
}