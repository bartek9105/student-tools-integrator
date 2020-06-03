const express = require('express')

const router = express.Router()

const taskController = require('../controllers/taskController')
//const isAuth = require('../policies/isAuth')

router.get('/', taskController.getTasks)
router.post('/add', taskController.addTask)
router.patch('/:id/edit', taskController.editTask)
router.delete('/:id/delete', taskController.deleteTask)

module.exports = router