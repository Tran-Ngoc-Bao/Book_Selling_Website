const express = require('express')
const mongoose = require('mongoose')

const book = require('./models/book.js')
const customer = require('./models/customer.js')
const publishinghouse = require('./models/publishinghouse.js')

try {
    mongoose.connect('mongodb://127.0.0.1:27017/bookstore')
        .then(() => console.log('Database connected!'))
} catch (error) {
    console.log(error);
}

async function test() {
    const p = await book.find({ publishinghouseid: "661a79b3fdb17d368353e72d"})
    for (let i = 0; i < p.length; ++i) {
        console.log(p[i].id)
    }
}

test()