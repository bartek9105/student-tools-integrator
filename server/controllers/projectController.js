const Project = require('../models/Project')

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find({
            creator: req.userId
        })
        res.send(projects)
    } catch (error) {
        console.log(error)
    }
}

exports.addProject = async (req, res) => {
    try {
        const newProject = new Project({
            name: req.body.name,
            color: req.body.color,
            creator: req.userId
        })
        const savedProject = await newProject.save()
        res.send(savedProject)        
    } catch (error) {
        console.log(error)
    }
}

exports.editProject = async (req, res) => {
    try {
        await Project.findByIdAndUpdate({ _id: req.params.id }, { 
            name: req.body.name,
            color: req.body.color 
        })
        res.send('Updated')
    } catch (error) {
        console.log(error)
    }
}

exports.deleteProject = async (req, res) => {
    try {
        await Project.findByIdAndRemove({ _id: req.params.id })
        res.send('Deleted')
    } catch (error) {
        console.log(error)
    }
}