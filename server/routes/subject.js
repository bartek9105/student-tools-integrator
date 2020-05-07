const express = require('express')
const router = express.Router()

const subjectController = require('../controllers/subjectController')

router.post('/add', subjectController.addSubject)
router.get('/', subjectController.getSubjeects)

module.exports = router