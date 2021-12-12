const {authenticateUser} = require('../ models/authenticationModel')
const jwt = require('jsonwebtoken')
const config = require('config')

const authenticate = async (username, password) => {
  const authenticationStatus = await authenticateUser(username, password)
  if (authenticationStatus.length === 0) {
    return undefined
  } else {
    const user = {name: username, exp: Math.floor(Date.now() / 1000) + 60 * 60}
    return jwt.sign(user, config.authentication.secret)
  }
}

const verifyToken = async (token) => {
  jwt.verify(token, config.authentication.secret, (err) => {
    if (err) {
      return false
    }
  })
  return true
}

module.exports = {authenticate, verifyToken}
