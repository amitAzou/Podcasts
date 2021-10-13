const config = require('config')
const { getItem } = require('../services/podcast')
const cache = new Map()
const cacheExpiration = 200000

const clearCache = (timeStamp) => {
  cache.forEach((value, key, map) => {
    if (timeStamp - value.timeAdded > cacheExpiration) {
      map.delete(key)
    }
  })
}

const getItemFromCache = (req, res, next) => {
  if (config.isCacheEnabled) {
    clearCache(Date.now())
    const id = parseInt(req.params.id)
    const result = cache.get(id)
    if (result) {
      return res.status(200).send(result.podcast)
    } else {
      const result = getItem(id)
      if (!result) {
        return res.status(404).send('This podcast does not exist')
      } else {
        cache.set(id, { podcast: result, timeAdded: Date.now() })
        return res.status(200).send(result)
      }
    }
  } else {
    next()
  }
}

module.exports = { getItemFromCache }
