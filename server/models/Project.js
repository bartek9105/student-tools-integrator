const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    color: String,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    }
})

module.exports = mongoose.model('Project', projectSchema)