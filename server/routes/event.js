const express = require('express')
const router = express.Router()

const eventController = require('../controllers/eventController')
//const isAuth = require('../policies/isAuth')

router.get('/', eventController.getEvents)
router.post('/add', eventController.addEvent)
router.patch('/edit/:id', eventController.editEvent)
router.patch('/exam/edit/:id', eventController.editExamEvent)
router.patch('/schedule/edit/:id', eventController.editScheduleEvent)
router.patch('/scheduleRecurring/edit/:id', eventController.editRecurringScheduleEvent)
router.delete('/delete/:id', eventController.deleteEvent)

module.exports = router