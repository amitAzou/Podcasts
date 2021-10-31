const joi = require('joi')

const idSchema =
    joi.object().keys(
      {
        id: joi.number().integer().required()
      }
    )

const addReviewSchema =
    joi.object().keys(
      {
        rating: joi.number().integer().min(1).max(10).required(),
        text: joi.string().required(),
        podcastId: joi.number().integer().required()
      }
    )
module.exports = { idSchema, addReviewSchema }
