const Offer = require('../models/Offer')

exports.getOffers = async (req, res) => {
    try {
        const offers = await Offer.find({
            creator: req.userId
        })
        res.send(offers)
    } catch (error) {
        console.log(error)
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
        res.send(savedOffer)
    } catch (error) {
        console.log(error)
    }
}

exports.editOffer = async (req, res) => {
    try {
        const editedOffer = await Offer.findByIdAndUpdate({ _id: req.params.id }, {
            title: req.body.title,
            description: req.body.description,
            contact: req.body.contact
        })
        res.send(editedOffer)
    } catch (error) {
        console.log(error)
    }
}

exports.deleteOffer = async (req, res) => {
    try {
        const deletedOffer = await Offer.findByIdAndRemove({
            _id: req.params.id
        })
        res.send(deletedOffer)
    } catch (error) {
        console.log(error)
    }
}