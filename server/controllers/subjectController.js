const Subject = require('../models/Subject')

exports.addSubject = async (req, res) => {
    try {
        const newSubject = new Subject({
            name: req.body.name
        })
        const savedSubject = await newSubject.save()
        res.send({
            message: savedSubject
        })
    } catch (error) {
        console.log(error);
    }
}

exports.getSubjeects = async (req, res) => {
    try {
        const subjects = await Subject.find()
        res.send(subjects)       
    } catch (error) {
        console.log(subjects)
    }
}