const express = require('express')
const router = express.Router()

const eventController = require('../controllers/eventController')
const isAuth = require('../policies/isAuth')

router.get('/', isAuth, eventController.getEvents)
router.post('/add', isAuth, eventController.addEvent)
router.patch('/edit/:id', isAuth, eventController.editEvent)
router.delete('/delete/:id', isAuth, eventController.deleteEvent)

module.exports = router