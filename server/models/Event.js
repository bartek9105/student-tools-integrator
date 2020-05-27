const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    startTime: {
        required: false,
        type: String
    },
    endTime: {
        required: false,
        type: String
    },
    startRecur: {
        required: false,
        type: String
    },
    endRecur: {
        required: false,
        type: String
    },
    start: {
        required: false,
        type: String
    },
    end: {
        required: false,
        type: String
    },
    daysOfWeek: {
        required: false,
        type: Array
    },
    details: {
        required: false,
        type: String
    }
})

module.exports = mongoose.model('Event', eventSchema)