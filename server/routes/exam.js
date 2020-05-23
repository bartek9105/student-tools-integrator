const express = require('express')

const router = express.Router()

const examController = require('../controllers/examController')

router.get('/', examController.getExams)
router.post('/add', examController.addExam)
router.patch('/:id/edit', examController.editExam)
router.delete('/:id/delete', examController.deleteExam)

module.exports = router