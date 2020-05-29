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
        type: Array,
        default: null
    },
    details: {
        required: false,
        type: String
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model('Event', eventSchema)