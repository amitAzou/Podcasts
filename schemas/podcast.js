const joi = require('joi')

const idSchema =
     joi.object().keys(
       {
         id: joi.number().integer().required()
       }
     )

const querySchema =
    joi.object().keys(
      {
        query: joi.string().required()
      }
    )

const numberSchema =
    joi.object().keys(
      {
        number: joi.number().integer().required()
      }
    )

const updateSchema = joi.object().keys(
  {
    id: joi.number().integer(),
    title: joi.string(),
    description: joi.string(),
    htmlDescription: joi.string(),
    webUrl: joi.string(),
    imageUrl: joi.string(),
    language: joi.string(),
    numberOfEpisodes: joi.number().integer(),
    avgEpisodeLength: joi.number().integer(),
    author: joi.string(),
    category: joi.string()
  })

const addSchema = joi.object().keys(
  {
    title: joi.string().required(),
    description: joi.string().required(),
    htmlDescription: joi.string().required(),
    webUrl: joi.string().required(),
    imageUrl: joi.string().required(),
    language: joi.string().required(),
    numberOfEpisodes: joi.number().integer().required(),
    avgEpisodeLength: joi.number().integer().required(),
    author: joi.string().required(),
    category: joi.string().required()
  })

module.exports = { addSchema, updateSchema, idSchema, querySchema, numberSchema }
