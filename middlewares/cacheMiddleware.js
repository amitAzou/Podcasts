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

const removeFromCache = async (key) => {
  await cache.del(key)
}

const getItemFromCache = async (req, res, next) => {
  const key = req.url
  if (config.isCacheEnabled && req.method === 'GET') {
    const result = await cache.get(key)
    if (result) {
      return res.status(200).send(JSON.parse(result))
    } else {
      const sendResponse = res.send
      res.send = (body) => {
        if (res.status === 200) {
          saveToCache(key, body)
        }
        res.send = sendResponse
        res.send(body)
      }
    }
  } else {
    if (req.method === 'PUT' || req.method === 'DELETE') {
      const result = await cache.get(key)
      if (result) {
        await removeFromCache(key)
      }
    }
  }
  next()
}

module.exports = {getItemFromCache}
