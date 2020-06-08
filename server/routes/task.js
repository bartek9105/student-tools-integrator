const express = require('express')

const router = express.Router()

const taskController = require('../controllers/taskController')
const isAuth = require('../policies/isAuth')

router.get('/', isAuth, taskController.getTasks)
router.post('/add', isAuth, taskController.addTask)
router.patch('/:id/edit', isAuth, taskController.editTask)
router.delete('/:id/delete', isAuth, taskController.deleteTask)

module.exports = router