const {getItemFromCache} = require('../services/cache')

const useCache = async (req, res, next) => {
  return getItemFromCache(req, res, next)
}

module.exports = {useCache}
