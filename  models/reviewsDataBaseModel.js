const mysql = require('../utils/mysql')

const getReviewsArr = async () => {
  const data = await mysql.runQuery('SELECT * FROM `podcasts`.`reviews`')
  return data.sort((a, b) => a.podcastId - b.podcastId)
}

const getReviewsFromDataBase = async (id) => {
  const data = await getReviewsArr()
  const result = data.filter(review => review.podcastId === id)
  if (result.length === 0) {
    return null
  }
  return result
}

const addReviewToDataBase = async (review) => {
  return await mysql.runQuery(
    'INSERT INTO `podcasts`.`reviews` (rating, id, podcastId, text )  VALUES (?, ? ,? ,?)',
    [review.rating, review.id, review.podcastId, review.text])
}

module.exports = {
  getReviewsFromDataBase,
  addReviewToDataBase,
  getReviewsArr
}
