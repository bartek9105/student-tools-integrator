const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: new Date(),
    done: {
        dafault: false
    }
})

module.exports = mongoose.model('Task', taskSchema)