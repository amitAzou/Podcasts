const config = require('config')
const redis = require('redis')
const cache = redis.createClient(config.redis)
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
      element.cacheToClear.forEach(async (urlToDelete) => {
        const keys = []
        pathToRegexp(urlToDelete, keys)
        let stringToCmp = urlToDelete
        keys.map((key, index) => {
          stringToCmp = stringToCmp.replace(`:${key.name}`, regexp[index + 1])
        })
        if (stringToCmp === url) {
          await cache.del(stringToCmp)
        } else {
          await cache.del(urlToDelete)
        }
      })
    }
  })
}

const getItemFromCache = async (req, res, next) => {
  const key = req.url
  const method = req.method
  if (config.isCacheEnabled) {
    if (config.isCacheEnabled && method === 'GET') {
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
      if (method === 'DELETE' || method === 'PUT')
        await checkUrlToClear(key, method)
    }
  }
  next()
}

module.exports = {getItemFromCache}
