const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    details: {
        required: true,
        type: String,
    },
    start: {
        required: true,
        type: String
    },
    end: {
        required: true,
        type: String
    },
    color: {
        type: String
    }
})

module.exports = mongoose.model('Event', eventSchema)