const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }, 
    done: {
        dafault: false
    }
})

module.exports = mongoose.model('Task', taskSchema)