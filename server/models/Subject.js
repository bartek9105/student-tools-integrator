const mongoose = require('mongoose')

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    exams: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam'
    },
    requirements: [{
        name: String,
        progress: Number
    }],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model('Subject', subjectSchema)