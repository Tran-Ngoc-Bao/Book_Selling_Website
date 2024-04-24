const publishinghouse = require('../models/publishinghouse')

const getAllPublishinghouse = async (req, res) => {
    try {
        const publishinghouses = await publishinghouse.find()
        res.json(publishinghouses);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' })
    }
}
const getPublishinhghouseDetails = async (req, res) => {
}
const createPublishinghouse = async (req, res) => {
    const { booksid, email, location, name, phone } = req.body
    const checkEmail = await publishinghouse.readByEmail(email)
    const checkName = await publishinghouse.readByEmail(name)
    const checkPhone = await publishinghouse.readByEmail(phone)
    if (checkEmail||checkName||checkPhone){
        res.status(400).json({message:'Existed'})
    } else {
        const newPublishinghouse = await publishinghouse.create(req.body)
        res.status(201).json(newPublishinghouse)
    }
}
const updatePublishinghouse = async (req, res) => { }
const deletePublishinghouse = async (req, res) => { }
const sentOrder = async (req, res) => { }
module.exports = {
    getAllPublishinghouse,
    getPublishinhghouseDetails,
    createPublishinghouse,
    updatePublishinghouse,
    deletePublishinghouse,
    sentOrder
}