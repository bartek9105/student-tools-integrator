const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    color: String
})

module.exports = mongoose.model('Project', projectSchema)