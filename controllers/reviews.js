const { getItem, addNewItem, isItemExisting } = require('../services/reviews')

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

const addReview = async (req, res, next) => {
  try {
    const isExisting = isItemExisting(parseInt(req.body.podcastId))
    if (!isExisting) {
      res.status(404).send('Can not add review, podcast does not exist')
    } else {
      await addNewItem(req.body)
      res.status(200).send('The review has been added')
    }
  } catch (err) {
    return next(err)
  }
}

module.exports = { getReviews, addReview }
