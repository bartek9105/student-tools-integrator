const express = require('express')

const router = express.Router()

const offerController = require('../controllers/offerController')
const isAuth = require('../policies/isAuth')

router.get('/', isAuth, offerController.getOffers)
router.post('/add', isAuth, offerController.addOffer)
router.patch('/:id/edit', isAuth, offerController.editOffer)
router.delete('/:id/delete', isAuth, offerController.deleteOffer)

module.exports = router