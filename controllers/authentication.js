const { authenticationService } = require('../services/authentication')

const authenticateController = async (req, res, next) => {
  try {
    const { username, password } = req.params
    const token = await authenticationService(username, password)
    return res.status(200).json(token)
  } catch (err) {
    next(err)
  }
}

module.exports = { authenticateController }
