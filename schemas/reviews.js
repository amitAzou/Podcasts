const joi = require('joi')

const idSchema =
    joi.object().keys(
      {
        id: joi.number().integer().required()
      }
    )

module.exports = { idSchema }
