const Offer = require('../models/Offer')

exports.getOffers = async (req, res) => {
    try {
        const offers = await Offer.find()
        res.status(200).send(offers)
    } catch (error) {
        res.status(400).send({ error: error })
    }
}

exports.addOffer = async (req, res) => {
    try {
        const newOffer = new Offer({
            title: req.body.title,
            description: req.body.description,
            contact: req.body.contact,
            creator: req.userId
        })
        const savedOffer = await newOffer.save()
        res.status(200).send(savedOffer)
    } catch (error) {
        res.status(400).send({ error: error })
    }
}

exports.editOffer = async (req, res) => {
    try {
        const editedOffer = await Offer.findByIdAndUpdate({ _id: req.params.id }, {
            title: req.body.title,
            description: req.body.description,
            contact: req.body.contact
        })
        res.status(200).send(editedOffer)
    } catch (error) {
        res.status(400).send({ error: error })
    }
}

exports.deleteOffer = async (req, res) => {
    try {
        const deletedOffer = await Offer.findByIdAndRemove({
            _id: req.params.id
        })
        res.status(200).send(deletedOffer)
    } catch (error) {
        res.status(400).send({ error: error })
    }
}