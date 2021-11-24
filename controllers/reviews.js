const { getItem, addNewItem } = require('../services/reviews')

const getReviews = async (req, res, next) => {
  try {
    const result = await getItem(parseInt(req.params.id))
    if (!result) {
      return res.status(200).send('There are no reviews for this podcast')
    } else {
      return res.status(200).send(result)
    }
  } catch (err) {
    return next(err)
  }
}

const addReview = async (req, res, next) => {
  try {
    await addNewItem(req.body)
    return res.status(200).send('The review has been added')
  } catch (err) {
    return next(err)
  }
}

module.exports = { getReviews, addReview }
