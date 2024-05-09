const publishinghouse = require('../models/publishinghouse')
const sendOrder = require('../service/emailService')

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
    try {
        const findPublishinhghouse = await publishinghouse.readById(req.params.id)
        if (!findPublishinhghouse) {
            return res.status(404).json({ message: 'Publishinghouse not found' })
        }
        res.json(findPublishinhghouse)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server Error' })
    }
}
const createPublishinghouse = async (req, res) => {
    const { bookids, email, location, name, phone } = req.body
    const checkEmail = await publishinghouse.readByEmail(email)
    const checkName = await publishinghouse.readByEmail(name)
    const checkPhone = await publishinghouse.readByEmail(phone)
    if (checkEmail || checkName || checkPhone) {
        res.status(400).json({ message: 'Existed' })
    } else {
        const newPublishinghouse = await publishinghouse.create(req.body)
        res.status(201).json(newPublishinghouse)
    }
}
const updatePublishinghouse = async (req, res) => {
    const publishinghouseID = req.params.id
    const updateField = req.body
    try {
        const existingPublishinghouse = await publishinghouse.readById(publishinghouseID)
        if (!existingPublishinghouse) {
            return res.status(400).json({ message: 'Book not found' })
        }
        else {
            await publishinghouse.findByIdAndUpdate(publishinghouseID, updateField)
            const updatedPublishinghouse = await publishinghouse.readById(publishinghouseID)
            res.json({ message: 'updated successfully', publishinghouseid: publishinghouseID, updatedPublishinghouse })

        }
    } catch (error) {
        console.error('Error updating customer:', error)
        res.status(500).json({ message: 'Server Error' })
    }
}
const deletePublishinghouse = async (req, res) => {
    try {
        const publishinghouseID = req.params.id
        await publishinghouse.delete(publishinghouseID)
        res.status(200).json({ message: 'Delete publishinghouse successfully' })
    } catch (error) {
        console.error('Error deleting publishinghouse:', error)
        res.status(500).json({ message: 'Server Error' })
    }
}
const sendEmailOrder = async (req, res) => {
    try {
        const publishingHouse = await publishinghouse.readById(req.params.id)
        await sendOrder.sendEmail()
        res.status(200).json(publishingHouse.email)
    } catch (error) {
        console.error('Error sending email:', error)
        res.status(500).json({ message: 'Server Error' })
    }
}
module.exports = {
    getAllPublishinghouse,
    getPublishinhghouseDetails,
    createPublishinghouse,
    updatePublishinghouse,
    deletePublishinghouse,
    sendEmailOrder
}