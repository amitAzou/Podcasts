const config = require('config')
const jwt = require('jsonwebtoken')

const authenticateToken = async (req, res, next) => {
  if (config.authentication.isAuthenticationEnabled && !(req.url.includes(config.authentication.loginUrl))) {
    const token = req.headers.authorization
    if (token === null) {
      return res.status(401).send('No Token given')
    } else {
      jwt.verify(token, config.authentication.secret, (err) => {
        if (err) {
          return res.status(403).send('Token invalid')
        }
      })
    }
  }
  next()
}

module.exports = { authenticateToken }
