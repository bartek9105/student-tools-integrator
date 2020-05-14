const express = require('express')
const router = express.Router()

const eventController = require('../controllers/eventController')

router.get('/', eventController.getEvents)
router.post('/add', eventController.addEvent)
router.patch('/edit/:id', eventController.editEvent)
router.delete('/delete/:id', eventController.deleteEvent)

module.exports = router