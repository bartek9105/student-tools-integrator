const Project = require('../models/Project')

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find()
        res.send(projects)
    } catch (error) {
        console.log(error)
    }
}

exports.addProject = async (req, res) => {
    try {
        const newProject = new Project({
            name: req.body.name
        })
        const savedProject = await newProject.save()
        res.send(savedProject)        
    } catch (error) {
        console.log(error)
    }
}