const express = require('express')
const router = express.Router()

const subjectController = require('../controllers/subjectController')
const isAuth = require('../policies/isAuth')

router.post('/add', isAuth, subjectController.addSubject)
router.patch('/:id/updateRequirements', isAuth, subjectController.updateRequirements)
router.patch('/:id/deleteRequirement/:reqId', isAuth, subjectController.deleteRequirement)
router.patch('/:id/editRequirements', isAuth, subjectController.editRequirements)

router.get('/', isAuth, subjectController.getSubjects)
router.get('/:id', isAuth, subjectController.getSubject)

router.patch('/:id/updateNotes', isAuth, subjectController.updateNotes)
router.patch('/:id/editNote', isAuth, subjectController.editNote)
router.patch('/:id/deleteNote/:noteId', isAuth, subjectController.deleteNote)

router.patch('/:id/edit', isAuth, subjectController.editSubject)
router.delete('/:id/delete', isAuth, subjectController.deleteSubject)

module.exports = router