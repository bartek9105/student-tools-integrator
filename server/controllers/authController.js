const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = async (req, res, next) => {
    try {
        const hashPassword = await bcrypt.hash(req.body.password, 12)
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

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        })
        if (!user) {
            res.send({
                error: 'User not found'
            })
        }
        const isEqual = await bcrypt.compare(req.body.password, user.password)
        if (!isEqual) {
            res.send({
                error: 'Wrong password'
            })
        }
        const token = jwt.sign({
            email: req.body.email,
            userId: user._id
        }, 'secretsecretsecretkey', { expiresIn: '1h'})
        res.send({
            token: token,
            userId: user._id
        })
    } catch (error) {
        console.log(error)
    }
}