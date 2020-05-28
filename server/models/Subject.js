const mongoose = require('mongoose')

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    requirements: [String],
    exams: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam'
    },
    notes: [String]
})

module.exports = mongoose.model('Subject', subjectSchema)