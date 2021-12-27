const {getBestPodcast} = require('../services/podcast')

const saveToS3 = async (req, res, next) => {
  try {
    const result = await getBestPodcast(10)
    if (result) {
      res.send
    }
  } catch (err) {
    return next(err)
  }
}

module.exports = {saveToS3}
