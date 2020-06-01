const express = require('express')

const router = express.Router()

const examController = require('../controllers/examController')
const isAuth = require('../policies/isAuth')

router.get('/', isAuth, examController.getExams)
router.post('/add', isAuth, examController.addExam)
router.patch('/:id/edit', isAuth, examController.editExam)
router.delete('/:id/delete', isAuth, examController.deleteExam)

module.exports = router