const User = require('../models/User')
const bcrypt = require('bcrypt')

exports.register = async (req, res, next) => {
    const hashPassword = await bcrypt.hash(req.body.password, 12)
    try {
        const user = new User({
            email: req.body.email,
            password: hashPassword
        })
        const savedUser = await user.save()
        res.send({
            user: savedUser
        })        
    } catch (error) {
        console.log(error)
    }
}

exports.login = (req, res) => {
    res.send('login')
}