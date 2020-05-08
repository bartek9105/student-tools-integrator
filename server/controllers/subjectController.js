const Subject = require('../models/Subject')

exports.addSubject = async (req, res) => {
    try {
        const newSubject = new Subject({
            name: req.body.name,
            requirements: req.body.req
        })
        const savedSubject = await newSubject.save()
        res.send({
            subject: savedSubject
        })
    } catch (error) {
        console.log(error);
    }
}

exports.getSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find()
        res.send(subjects)       
    } catch (error) {
        console.log(subjects)
    }
}

exports.getSubject = async (req, res) => {
    try {
        const subjects = await Subject.findById(req.params.id)
        res.send(subjects)       
    } catch (error) {
        console.log(subjects)
    }
}

exports.updateSubject = async (req, res) => {
    try {
        const updatedSubject = await Subject.updateOne({_id: req.params.id}, {$push: {requirements: req.body.requirement}})
        res.send(updatedSubject)
    } catch (error) {
        console.log(subjects)
    }
}