const Subject = require('../models/Subject')

exports.addSubject = async (req, res) => {
    try {
        const newSubject = new Subject({
            name: req.body.name,
            requirements: {
                name: req.body.reqName,
                progress: req.body.progress
            }
        })
        const savedSubject = await newSubject.save()
        res.send({
            subject: savedSubject
        })
    } catch (error) {
        console.log(error);
    }
}

exports.updateRequirements = async (req, res) => {
    try {
        const updatedSubject = await Subject.updateOne({_id: req.params.id}, {$push: {
            requirements: {
                "name": req.body.requirement,
                "progress": req.body.progress
            }
        }})
        res.send(updatedSubject)       
    } catch (error) {
        console.log(error)
    }
}

exports.editRequirements = async (req, res) => {
    try {
        await Subject.updateOne({'requirements._id': req.params.id}, {'$set': {
            'requirements.$.name': req.body.requirement,
            'requirements.$.progress': req.body.progress
        }})    
        res.send('updated')
    } catch (error) {
        console.log(error)
    }
}

exports.deleteRequirement = async (req, res) => {
    try {
        const updated = await Subject.updateOne({ _id: req.params.id }, { "$pull": { "requirements": { "_id": req.params.reqId } } })
        res.send(updated)       
    } catch (error) {
        console.log(error)
    }
}

exports.getSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find()
        res.send(subjects)       
    } catch (error) {
        console.log(error)
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

exports.updateNotes = async (req, res) => {
    try {
        const updatedSubject = await Subject.updateOne({_id: req.params.id}, {$push: {notes: req.body.note}})
        res.send(updatedSubject)
    } catch (error) {
        console.log(subjects)
    }
}

exports.deleteSubject = async (req, res) => {
    try {
        const deletedSubject = await Subject.findByIdAndRemove({_id: req.params.id})
        res.send(deletedSubject)
    } catch (error) {
        console.log(subjects)
    }
}

exports.editSubject = async (req, res) => {
    try {
        const editedSubject = await Subject.findByIdAndUpdate({ _id: req.params.id }, { name: req.body.name })
        res.send(editedSubject)
    } catch (error) {
        console.log(subjects)
    }
}