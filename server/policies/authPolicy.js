const Joi = require('@hapi/joi')

exports.authValidator = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    })

    const { error, value } = schema.validate(req.body)

    if (error) {
        res.send({
            error: error
        })
    }

    next()
}