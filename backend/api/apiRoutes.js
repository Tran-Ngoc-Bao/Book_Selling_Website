const BooksRouter = require('./booksRoute')
const CustomerRouter = require('./customerRoute')
const PublisinghouseRouter = require('./publishinghouseRoute')

const routes = (app) => {
    app.use('/api/books', BooksRouter)
    app.use('/api/customers', CustomerRouter)
    app.use('/api/publishinghouses', PublisinghouseRouter)
}

module.exports = routes