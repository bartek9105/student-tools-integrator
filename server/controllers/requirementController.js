const Requirement = require('../models/Requirement')

exports.getRequirements = async (req, res) => {
    try {
        const reqs = await Requirement.find().populate('subject', 'name')
        res.send(reqs)
    } catch (error) {
        console.log(error)
    }
}

exports.getSubjectRequirements = async (req, res) => {
    try {
        const reqs = await Requirement.subject.id(req.params.id)
        res.send(reqs)
    } catch (error) {
        console.log(error)
    }
}

exports.updateRequirements = async (req, res) => {
    try {
        const requirement = new Requirement({
            name: req.body.name,
            progress: req.body.progress,
            subject: req.body.subject
        })
        const savedReq = await requirement.save()
        res.send(savedReq)
    } catch (error) {
        console.log(error)
    }
}

exports.deleteRequirements = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}