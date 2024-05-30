const publishinghouse = require('../models/publishinghouse')
const sendOrder = require('../service/emailService')

const getAllPublishinghouse = async (req, res) => {
    try {
        const publishinghouses = await publishinghouse.find()
        res.json(publishinghouses);
    } catch (error) {
        console.error(error);
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
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server Error' })
    }
}
const getAllPublishinghouseName = async (req, res) => {
    try {
        const name = await publishinghouse.aggregate([
            { $unwind: "$name" },
            { $group: { _id: null, uniqueName: { $addToSet: "$name" } } },
            { $project: { _id: 0, uniqueName: 1 } },
            { $sort: { uniqueName: 1 } }
        ]);
        if (name.length === 0) {
            return res.status(404).json({ message: 'No genres found' })
        }
        res.status(200).json(name[0].uniqueName)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const createPublishinghouse = async (req, res) => {
    const { bookids, email, location, name, phone } = req.body
    try {
        const checkEmail = await publishinghouse.readByEmail(email)
        const checkName = await publishinghouse.readByEmail(name)
        const checkPhone = await publishinghouse.readByEmail(phone)
        if (checkEmail || checkName || checkPhone) {
            res.status(400).json({ message: 'Existed' })
        } else {
            const newPublishinghouse = await publishinghouse.create(req.body)
            res.status(201).json(newPublishinghouse)
        }
    } catch (error) {
        console.error('Error creating customer:', error)
        res.status(500).json({ message: 'Server Error' })
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
        res.status(200).json({ message: 'Deleted publishinghouse successfully' })
    } catch (error) {
        console.error('Error deleting publishinghouse:', error)
        res.status(500).json({ message: 'Server Error' })
    }
}
const sendEmailOrder = async (req, res) => {
    try {
        const publishingHouse = await publishinghouse.readById(req.params.id)
        await sendOrder.sendOrderEmail(publishingHouse.email)
        res.status(200).json({ message: 'Sent email successfully' })
    } catch (error) {
        console.error('Error sending email:', error)
        res.status(500).json({ message: 'Server Error' })
    }
}
module.exports = {
    getAllPublishinghouse,
    getPublishinhghouseDetails,
    getAllPublishinghouseName,
    createPublishinghouse,
    updatePublishinghouse,
    deletePublishinghouse,
    sendEmailOrder
}