const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dueDate: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    }, 
    done: {
        dafault: false
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }
})

module.exports = mongoose.model('Task', taskSchema)