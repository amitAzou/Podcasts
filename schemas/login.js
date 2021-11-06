const joi = require('joi')

const userSchema =
    joi.object().keys(
      {
        username: joi.string().required(),
        password: joi.string().required()
      }
    )

module.exports = { userSchema }
