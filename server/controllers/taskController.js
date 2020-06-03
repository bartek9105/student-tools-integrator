const Task = require('../models/Task')

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({
            creator: req.userId
        })
        res.send(tasks)
    } catch (error) {
        console.log(error)
    }
}

exports.addTask = async (req, res) => {
    try {
        const newTask = await new Task({
            name: req.body.name,
            project: req.body.project,
            priority: req.body.priority,
            dueDate: req.body.dueDate,
            creator: req.userId
        })
        const savedTask = await newTask.save()
        res.send(savedTask)        
    } catch (error) {
        console.log(error)
    }
}

exports.editTask = async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate({ _id: req.params.id }, { name: req.body.name })
        res.send(updatedTask)
    } catch (error) {
        console.log(error)        
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndRemove({ _id: req.params.id })
        res.send(deletedTask)
    } catch (error) {
        console.log(error)        
    }
}

exports.getTasksByProject = async (req, res) => {
    try {
        const tasks = await Task.find({ project: req.params.id })
        res.send(tasks)
    } catch (error) {
        console.log(error)
    }
}
