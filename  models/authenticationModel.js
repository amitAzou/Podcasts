const mysql = require('../utils/mysql')
const jwt = require('jsonwebtoken')
const config = require('config')

const authenticateUser = async (username, password) => {
  const authenticationStatus = await mysql.runQuery('SELECT * FROM `podcasts`.`users` WHERE username = ? AND password=?', [username, password])
  if (authenticationStatus.length === 0) {
    throw new Error('user not found')
  } else {
    const user = { name: username, exp: Math.floor(Date.now() / 1000) + (60 * 60) }
    return jwt.sign(user, config.authentication.secret)
  }
}

module.exports = { authenticateUser }
