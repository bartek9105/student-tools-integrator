const express = require('express')
const router = express.Router()

const userController = require('../controllers/User')

router.get('/', (req, res) => {
    res.send('user endpoint')
})

router.get('/login', userController.login)

module.exports = router