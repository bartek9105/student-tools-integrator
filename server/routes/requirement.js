const express = require('express')
const router = express.Router()

const requirementController = require('../controllers/requirementController')

router.get('/', requirementController.getRequirements)
router.get('/:id', requirementController.getSubjectRequirements)
router.post('/update', requirementController.updateRequirements)
router.delete('/:id/delete', requirementController.deleteRequirements)

module.exports = router