const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    console.log('uwu')
    return res.status(401).send('Unauthorized request')
  }

  const token = req.headers.authorization.split(' ')[1]
  if (!token) {
    return res.status(401).send('Unauthorized request')
  }

  const payload = jwt.verify(token, process.env.SECRET_KEY)
  req.userId = payload._id
  next()
}
module.exports = verifyToken
