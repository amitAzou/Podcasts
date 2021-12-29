const config = require('config')
const redis = require('redis')
const url = `redis://${config.redis.host}:${config.redis.port}`
const cache = redis.createClient({url})
cache.connect()
const {pathToRegexp} = require('path-to-regexp')

cache.on('error', (err) => {
  console.log(err)
})

const saveToCache = async (key, value) => {
  await cache.set(key, JSON.stringify(value))
  await cache.expire(key, config.cacheExpiration)
}

const checkUrlToClear = async (url, method) => {
  config.cache.find((element) => {
    const regexp = pathToRegexp(element.requestUrl).exec(url)
    if (regexp && method === element.method) {
      element.cacheToClear.forEach(async (outdatedCache) => {
        const keys = await cache.keys('*')

        keys.forEach((key) => {
          const regexp = pathToRegexp(outdatedCache).exec(key)
          if (regexp) {
            cache.del(key)
          }
        })
      })
    }
  })
}

const getItemFromCache = async (req, res, next) => {
  const key = req.path
  const method = req.method
  if (config.isCacheEnabled) {
    if (config.isCacheEnabled && method === 'GET') {
      const result = await cache.get(key)
      if (result) {
        return res.status(200).send(JSON.parse(result))
      } else {
        const sendResponse = res.send
        res.send = (body) => {
          if (res.statusCode === 200) {
            saveToCache(key, body)
          }
          res.send = sendResponse
          res.send(body)
        }
      }
    } else {
      if (method === 'DELETE' || method === 'PUT' || method === 'POST')
        await checkUrlToClear(key, method)
    }
  }
  next()
}

module.exports = {getItemFromCache}
