const express = require('express')

const router = express.Router()

const offerController = require('../controllers/offerController')

router.get('/', offerController.getOffers)
router.post('/add', offerController.addOffer)
//router.delete('/:id/delete', examController.deleteOffer)

module.exports = router