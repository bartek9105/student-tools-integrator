const mongoose = require('mongoose')

const offerSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String,
    },
    description: {
        required: true,
        type: String
    },
    contact: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('Offer', offerSchema)