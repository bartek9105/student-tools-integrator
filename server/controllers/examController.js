const Exam = require('../models/Exam')

exports.getExams = async (req, res) => {
    try {
        const exams = await Exam.find({
            creator: req.userId
        })
        res.send(exams)
    } catch (error) {
        console.log(error);
    }
}

exports.addExam = async (req, res) => {
    try {
        const newExam = new Exam({
            subject: req.body.subject,
            date: req.body.date,
            duration: req.body.duration,
            room: req.body.room,
            color: req.body.color,
            creator: req.userId
        })
        const savedExam = await newExam.save()
        res.send(savedExam)
    } catch (error) {
        console.log(error)
    }
}

exports.editExam = async (req, res) => {
    try {
        const editedTask = await Exam.findByIdAndUpdate({ _id: req.params.id }, {
            date: req.body.date,
            duration: req.body.duration,
            room: req.body.room,
            color: req.body.color
        })
        res.send(editedTask)
    } catch (error) {
        console.log(error)
    }
}

exports.deleteExam = async (req, res) => {
    try {
        const deletedTask = await Exam.findByIdAndRemove({ _id: req.params.id })
        res.send(deletedTask)
    } catch (error) {
        console.log(error)
    }
}