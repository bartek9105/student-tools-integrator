const Event = require('../models/Event')

exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find()
        res.send(events)
    } catch (error) {
        console.log(error)
    }
}

exports.getByDate = async (req, res) => {
    try {
        const results = await Event.aggregate([
            {$group: {_id: '$start', subjectDetails: {$push: {
                title: '$title',
                subjectId: '$subject',
                startTime: '$startTime',
                endTime: '$endTime'
            }}}}
        ])
        res.send(results)
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
            subject: req.body.subject
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
        const editedEvent = await Event.findByIdAndUpdate({ _id: req.params.id }, { details: req.body.details })
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
