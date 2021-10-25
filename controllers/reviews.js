const { getItem } = require('../services/reviews')

const getReviews = async (req, res, next) => {
  try {
    const result = await getItem(parseInt(req.params.id))
    if (!result) {
      res.status(404).send('There are no reviews for this podcast')
    } else {
      res.status(200).send(result)
    }
  } catch (err) {
    return next(err)
  }
}

module.exports = { getReviews }
