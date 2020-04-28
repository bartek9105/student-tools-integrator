const express = require('express')
const router = express.Router()

const authController = require('../controllers/authController')
const authPolicy = require('../policies/authPolicy')

router.post('/register', authPolicy.authValidator, authController.register)

router.post('/login', authPolicy.authValidator, authController.login)

module.exports = router