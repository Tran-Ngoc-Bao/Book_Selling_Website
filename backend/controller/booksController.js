const book = require('../models/book')

const paginateResults = async (model, query, p = 1, limit = 12) => {
    const startIndex = (p - 1) * limit
    const totalItems = await model.countDocuments(query)
    const totalPages = Math.ceil(totalItems / limit)
    const results = await model.find(query).skip(startIndex).limit(limit)
    return { results, totalPages, totalItems, currentPage: p }
}
const getAll = async (req, res) => {
    try {
        const { p, limit } = req.query
        const { results, totalPages, totalItems, currentPage } = await paginateResults(book, {}, p, limit)
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
const getByGenre = async (req, res) => {
    try {
        let findBookByGenre
        //const { p, limit } = req.query
        const genres = req.params.genre.split(',')
        const sortOptions = req.query.sortBy ? req.query.sortBy.split(',') : []
        if (sortOptions.includes('sold')) {
            findBookByGenre = await book.sortBySoldWithGenre({ genres: { $in: genres } })
        } else if (sortOptions.includes('rate')) {
            findBookByGenre = await book.sortBySoldWithGenre({ genres: { $in: genres } })
        } else {
            findBookByGenre = await book.find({ genres: { $in: genres } })
        }
        if (!findBookByGenre || findBookByGenre.length === 0) {
            return res.status(404).json({ message: 'Book not found' })
        }
        //const { results, totalPages, totalItems, currentPage } = await paginateResults(findBookByGenre, {}, p, limit)
        res.json(findBookByGenre)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server Error' })
    }
}
const getByPublishinghouse = async (req, res) => {
    try {
        let findBookByPublishinghouse
        const { p, limit } = req.query
        const publishingHouseId = req.params.publishinghouseid
        const sortOptions = req.query.sortBy ? req.query.sortBy.split(',') : []
        if (sortOptions.includes('sold')) {
            findBookByPublishinghouse = await book.sortBySoldWithPublishingHouse(publishingHouseId)
        } else if (sortOptions.includes('rate')) {
            findBookByPublishinghouse = await book.sortByRateWithPublishingHouse(publishingHouseId)
        } else {
            findBookByPublishinghouse = await book.readByPublishingHouseId(publishingHouseId)
        }
        if (!findBookByPublishinghouse || findBookByPublishinghouse.length === 0) {
            return res.status(404).json({ message: 'Book not found' })
        }
        res.json(findBookByPublishinghouse)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server Error' })
    }
}
const createBook = async (req, res) => {
    try {
        const { authors, description, feedbacks, genres, price, publishinghouseid, quantity, rate, sold, title, year } = req.body
        if (!authors || !genres || !price || !publishinghouseid
            || !quantity || !title || !year) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        } else {
            const newBook = await book.create(req.body)
            res.status(201).json(newBook)
        }
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
            res.json({ message: 'updated successfully', bookid: bookID, updatedBook })

        }
    } catch (error) {
        console.error('Error updating customer:', error)
        res.status(500).json({ message: 'Server Error' })
    }
}
const deleteBook = async (req, res) => {
    try {
        const bookID = req.params.id
        await book.delete(bookID)
        res.status(200).json({ message: 'Delete customer successfully' })
    } catch (error) {
        console.error('Error deleting customer:', error)
        res.status(500).json({ message: 'Server Error' })
    }
}
module.exports = {
    getAll,
    getOne,
    getByGenre,
    getByPublishinghouse,
    createBook,
    updateBook,
    deleteBook
}