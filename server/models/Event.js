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
        required: true,
        type: String
    },
    endRecur: {
        required: true,
        type: String
    },
    daysOfWeek: {
        required: false,
        type: Array
    }
})

module.exports = mongoose.model('Event', eventSchema)