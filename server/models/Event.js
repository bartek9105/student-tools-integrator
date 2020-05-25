const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    title: {
        required: true,
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
    startRecurence: {
        required: false,
        type: String
    },
    endRecurence: {
        required: false,
        type: String
    },
    daysOfWeek: {
        required: false,
        type: Array
    }
})

module.exports = mongoose.model('Event', eventSchema)