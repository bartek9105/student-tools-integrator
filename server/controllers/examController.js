const Exam = require('../models/Exam')

exports.getExams = async (req, res) => {
    try {
        const exams = await Exam.find()
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
        })
        const savedExam = await newExam.save()
        res.send(savedExam)
    } catch (error) {
        console.log(error)
    }
}