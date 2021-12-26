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
      const urlParams = element.requestUrl.match(/:(.*?)($|\/)/g)
      element.cacheToClear.forEach(async (outdatedCache) => {
        const urlToDelete = urlParams.reduce(
          (result, urlParam, index) =>
            result.replace(urlParam, regexp[index + 1]),
          outdatedCache
        )
        await cache.del(urlToDelete)
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
