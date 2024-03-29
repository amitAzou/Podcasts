const mysql = require('../utils/mysql')

const getReviewsArr = async () => {
  return await mysql.runQuery('SELECT * FROM `podcasts`.`reviews` ORDER BY id')
}

const getReviewsFromDataBase = async (id) => {
  return await mysql.runQuery('SELECT * FROM `podcasts`.`reviews` WHERE podcastId=?', [id])
}

const addReviewToDataBase = async (review) => {
  return await mysql.runQuery(
    'INSERT INTO `podcasts`.`reviews` (rating, podcastId, text )  VALUES (?, ? ,?)',
    [review.rating, review.podcastId, review.text])
}

module.exports = {
  getReviewsFromDataBase,
  addReviewToDataBase,
  getReviewsArr
}
