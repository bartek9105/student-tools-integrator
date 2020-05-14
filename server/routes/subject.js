const express = require('express')
const router = express.Router()

const subjectController = require('../controllers/subjectController')

router.post('/add', subjectController.addSubject)
router.get('/', subjectController.getSubjects)
router.get('/:id', subjectController.getSubject)
router.patch('/:id/update', subjectController.updateSubject)
router.patch('/:id/edit', subjectController.editSubject)
router.delete('/:id/delete', subjectController.deleteSubject)

module.exports = router