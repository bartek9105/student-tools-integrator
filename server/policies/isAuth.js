const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization')
    if (!authHeader) {
        res.status(401).send('Not authenticated')
    } 
    const token = authHeader.split(' ')[1]
    let decodedToken
    try {
        decodedToken = jwt.verify(token, 'secretsecretsecretkey')
    } catch (error) {
        console.log(error)
    }
    if (!decodedToken) {
        res.send('Not authenticated')
    }
    req.userId = decodedToken.userId
    next()
}