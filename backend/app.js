const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routes = require('./api/apiRoutes')

dotenv.config()

const app = express()
const port = process.env.PORT || 8000

// Middleware
app.use(express.json());
app.use("/images", express.static('images'));

try {
  mongoose.connect('mongodb://127.0.0.1:27017/bookstore')
    .then(() => console.log('Database connected!'))
} catch (error) {
  console.log(error);
}

routes(app);

app.get('/', (req, res) => {
  res.send('Welcome to the bookstore backend!');
});
app.listen(port, () => {
  console.log('server is running on port', + port)
});

// express = require('express')
// const mongoose = require('mongoose')

// const book = require('./models/book.js')
// const customer = require('./models/customer.js')
// const publishinghouse = require('./models/publishinghouse.js')

// try {
//     mongoose.connect('mongodb://127.0.0.1:27017/bookstore')
//         .then(() => console.log('Database connected!'))
// } catch (error) {
//     console.log(error);
// }

// async function test() {
//     const x = await publishinghouse.readByName("Nhà xuất bản Văn học")
//     console.log(x.id)
//     const p = await book.sortBySoldWithPublishingHouse((await publishinghouse.readByName("Nhà xuất bản Văn học")).id)
//     for (let i = 0; i < p.length; ++i) {
//         console.log(p[i].title)
//     }
// }

// test()