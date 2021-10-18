const config = require('config')
const cache = new Map()
const cacheExpiration = 200000

const isExpired = (item) => {
  const timeStamp = Date.now()
  return timeStamp - item.timeAdded > cacheExpiration
}

const saveToCache = (key, value) => {
  if (cache.get(key)) {
    cache.delete(key)
  }
  cache.set(key, { value: value, timeAdded: Date.now() })
}

const getItemFromCache = (req, res, next) => {
  if (config.isCacheEnabled && req.method === 'GET') {
    const key = req.url
    const result = cache.get(key)
    if (result && !isExpired(result)) {
      return res.status(200).send(result.value)
    } else {
      const sendResponse = res.send
      res.send = (body) => {
        saveToCache(req.url, body)
        res.send = sendResponse
        res.send(body)
      }
    }
  }
  next()
}

module.exports = { getItemFromCache }
