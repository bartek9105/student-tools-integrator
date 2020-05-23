const mongoose = require('mongoose')

const examSchema = new mongoose.Schema({
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    },
    date: {
        type: String
    },
    duration: {
        type: String
    },
    room: {
        type: String
    },
    color: String
})

module.exports = mongoose.model('Exam', examSchema)