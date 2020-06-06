const Offer = require('../models/Offer')

exports.getOffers = async (req, res) => {
    try {
        const offers = await Offer.find()
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
            contact: req.body.contact
        })
        const savedOffer = await newOffer.save()
        res.send(savedOffer)
    } catch (error) {
        console.log(error)
    }
}