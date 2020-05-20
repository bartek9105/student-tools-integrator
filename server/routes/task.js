const express = require('express')

const router = express.Router()

const taskController = require('../controllers/taskController')

router.get('/', taskController.getTasks)
router.post('/add', taskController.addTask)

module.exports = router