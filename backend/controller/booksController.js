const book = require('../models/book')

const paginateResults = async (query, p = 1, limit = 12, sortBy) => {
    const startIndex = (p - 1) * limit
    const totalItems = await book.countDocuments(query)
    const totalPages = Math.ceil(totalItems / limit)
    const results = await book.find(query).skip(startIndex).limit(limit).sort(sortBy)
    return { results, totalPages, totalItems, currentPage: p }
}
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
        const { p, limit, sortBy } = req.query
        const { results, totalPages, totalItems, currentPage } = await paginateResults(query, p, limit, sortBy)
        res.json({ books: results, pagination: { totalPages, totalItems, currentPage } })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server Error' })
    }
}
const getOne = async (req, res) => {
    try {
        const findBook = await book.readById(req.params.id)
        if (!findBook) {
            return res.status(404).json({ message: 'Book not found' })
        }
        res.json(findBook)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

const createBook = async (req, res) => {
    try {
        const { authors, description, feedbacks, genres, price, publishinghouseid, quantity, rate, sold, title, year } = req.body
        const newBook = await book.create(req.body)
        res.status(201).json(newBook)

    } catch (err) {
        console.error(err)
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
module.exports = {
    getAll,
    getOne,
    createBook,
    updateBook,
    deleteBook
}