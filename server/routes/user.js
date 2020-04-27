const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('user endpoint')
})

router.get('/login', (req, res) => {
    res.send('user login endpoint')
})

module.exports = router