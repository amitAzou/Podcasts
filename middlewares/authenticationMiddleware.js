const config = require('config')
const { verifyToken } = require('../services/authentication')

const authenticateToken = async (req, res, next) => {
  if (config.authentication.isAuthenticationEnabled && !(req.url.includes(config.authentication.loginUrl))) {
    const token = req.headers.authorization
    if (token === null) {
      return res.status(401).send('No Token given')
    } else {
      const verify = await verifyToken(token)
      if (verify === false) {
        return res.status(403).send('invalid token')
      }
    }
  }
  next()
}

module.exports = { authenticateToken }
