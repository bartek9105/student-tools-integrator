const express = require('express')

const router = express.Router()

const projectController = require('../controllers/projectController')
const isAuth = require('../policies/isAuth')

router.get('/', isAuth, projectController.getProjects)
router.post('/add', isAuth, projectController.addProject)
router.delete('/:id/delete', isAuth, projectController.deleteProject)
router.patch('/:id/edit', isAuth, projectController.editProject)

module.exports = router