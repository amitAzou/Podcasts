const {authenticate} = require('../services/authentication')

const authenticateController = async (req, res, next) => {
  try {
    const {username, password} = req.params
    const token = await authenticate(username, password)
    if (!token) {
      return next(new Error("'username or password invalid"))
    } else {
      return res.status(200).send(token)
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {authenticateController}
