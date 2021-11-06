const config = require('config')
const redis = require('redis')
const cache = redis.createClient(config.redis)
cache.connect()

cache.on('error', (err) => {
  console.log(err)
})

const saveToCache = async (key, value) => {
  await cache.set(key, JSON.stringify(value))
  await cache.expire(key, config.cacheExpiration)
}

const getItemFromCache = async (req, res, next) => {
  if (config.isCacheEnabled && req.method === 'GET') {
    const key = req.url
    const result = await cache.get(key)
    if (result) {
      return res.status(200).send(JSON.parse(result))
    } else {
      const sendResponse = res.send
      res.send = (body) => {
        saveToCache(key, body)
        res.send = sendResponse
        res.send(body)
      }
    }
  }
  next()
}

module.exports = { getItemFromCache }
