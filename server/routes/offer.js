const express = require('express')

const router = express.Router()

const offerController = require('../controllers/offerController')

router.get('/', offerController.getOffers)
router.post('/add', offerController.addOffer)
router.patch('/:id/edit', offerController.editOffer)
router.delete('/:id/delete', offerController.deleteOffer)

module.exports = router