const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    start: {
        required: true,
        type: String
    },
    end: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('Event', eventSchema)