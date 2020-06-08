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
    teacher: {
        type: String,
        required: false
    },
    color: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    notes: [{
        content: String
    }],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model('Subject', subjectSchema)