const User = require('../models/User')

exports.register = async (req, res, next) => {
    try {
        const user = new User({
            email: req.body.email,
            password: req.body.password
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