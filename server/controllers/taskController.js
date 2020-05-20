const Task = require('../models/Task')

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find()
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
            dueDate: req.body.dueDate
        })
        const savedTask = await newTask.save()
        res.send(savedTask)        
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