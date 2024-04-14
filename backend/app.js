const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const booksRoutes = require('./api/booksRoute.js')
const customerRoute = require('./api/customerRoute.js')
const publishinghouseRoute = require('./api/publishinghouseRoute.js')
dotenv.config()

const app = express()
const port = process.env.PORT || 8000

// Middleware
app.use(express.json());

try {
  mongoose.connect('mongodb://127.0.0.1:27017/bookstore')
    .then(() => console.log('Database connected!'))
} catch (error) {
  console.log(error);
}

app.use('/api', booksRoutes)
app.use('/api', customerRoute)
app.use('/api', publishinghouseRoute)

app.get('/', (req, res) => {
  res.send('Welcome to the bookstore backend!');
});
app.listen(port, () => {
  console.log('server is running on port', + port)
})
