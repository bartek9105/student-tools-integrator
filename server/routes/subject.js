const express = require('express')
const router = express.Router()

const subjectController = require('../controllers/subjectController')

router.post('/add', subjectController.addSubject)
router.patch('/:id/updateRequirements', subjectController.updateRequirements)
router.patch('/:id/deleteRequirement/:reqId', subjectController.deleteRequirement)
router.patch('/:id/editRequirements', subjectController.editRequirements)

router.get('/', subjectController.getSubjects)
router.get('/:id', subjectController.getSubject)

router.patch('/:id/updateNotes', subjectController.updateNotes)
router.patch('/:id/editNote', subjectController.editNote)
router.patch('/:id/deleteNote/:noteId', subjectController.deleteNote)

router.patch('/:id/edit', subjectController.editSubject)
router.delete('/:id/delete', subjectController.deleteSubject)

module.exports = router