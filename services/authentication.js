const { authenticateUser } = require('../ models/authenticationModel')

const authenticationService = async (username, password) => {
  return await authenticateUser(username, password)
}

module.exports = { authenticationService }
