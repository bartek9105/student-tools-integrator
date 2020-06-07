const Event = require('../models/Event')

exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find({
            creator: req.userId
        }).populate('subject', ['name', 'teacher'])
        res.send(events)
    } catch (error) {
        console.log(error)
    }
}

exports.addEvent = async (req, res) => {
    try {
        const event = new Event({
            title: req.body.title,
            start: req.body.start,
            end: req.body.end,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            startRecur: req.body.startRecurence,
            endRecur: req.body.endRecurence,
            daysOfWeek: req.body.daysOfWeek,
            details: req.body.details,
            subject: req.body.subject,
            room: req.body.room,
            exam: req.body.exam,
            color: req.body.color,
            creator: req.userId
        })
        const savedEvent = await event.save()
        res.send({
            event: savedEvent
        })
    } catch (error) {
        console.log(error)
    }
}

exports.editEvent = async (req, res) => {
    try {
        const editedEvent = await Event.findByIdAndUpdate({ _id: req.params.id }, { 
        
        })
        res.send(editedEvent)
    } catch (error) {
        console.log(error)
    }
}

exports.editExamEvent = async (req, res) => {
    try {
        const editedEvent = await Event.findByIdAndUpdate({ _id: req.params.id }, {
            title: req.body.title,
            start: req.body.start,
            end: req.body.end,
            subject: req.body.subject,
            room: req.body.room,
            color: req.body.color
        })
        res.send(editedEvent)
    } catch (error) {
        console.log(error)
    }
}

exports.editRecurringScheduleEvent = async (req, res) => {
    try {
        const editedEvent = await Event.findByIdAndUpdate({ _id: req.params.id }, {
            title: req.body.title,
            subject: req.body.subject,
            room: req.body.room,
            startRecur: req.body.startRecur,
            endRecur: req.body.endRecur,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            daysOfWeek: req.body.daysOfWeek
        })
        res.send(editedEvent)
    } catch (error) {
        console.log(error)
    }
}

exports.editScheduleEvent = async (req, res) => {
    try {
        const editedEvent = await Event.findByIdAndUpdate({ _id: req.params.id }, {
            title: req.body.title,
            start: req.body.start,
            end: req.body.end,
            subject: req.body.subject,
            room: req.body.room
        })
        res.send(editedEvent)
    } catch (error) {
        console.log(error)
    }
}

exports.deleteEvent = async (req, res) => {
    try {
        await Event.findByIdAndRemove({ _id: req.params.id })
        res.send('Deleted')
    } catch (error) {
        console.log(error)
    }
}
