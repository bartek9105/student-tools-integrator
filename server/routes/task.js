const express = require('express')

const router = express.Router()

const taskController = require('../controllers/taskController')

router.get('/', taskController.getTasks)
router.get('/:id', taskController.getTasksByProject)
router.post('/add', taskController.addTask)
router.patch('/:id/edit', taskController.editTask)
router.delete('/:id/delete', taskController.deleteTask)

module.exports = router