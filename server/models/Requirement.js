const mongoose = require('mongoose')

const requirementSchema = new mongoose.Schema({
    name: String,
    progress: Number,
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    }
})

module.exports = mongoose.model('Requirement', requirementSchema)