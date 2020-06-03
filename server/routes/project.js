const express = require('express')

const router = express.Router()

const projectController = require('../controllers/projectController')
//const isAuth = require('../policies/isAuth')

router.get('/', projectController.getProjects)
router.post('/add', projectController.addProject)
router.delete('/:id/delete', projectController.deleteProject)
router.patch('/:id/edit', projectController.editProject)

module.exports = router