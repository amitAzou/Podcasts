const fsPromises = require('fs').promises
const config = require('config')
const path = require('path')
const reviewsPath = path.resolve(__dirname, '../', config.reviewsPath)

const getReviewsArr = async () => {
  const data = require(reviewsPath)
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

const getSortedReviewsFromDataBase = () => {
  const data = require(reviewsPath)
  return data.sort((a, b) => b.id - a.id)
}

const saveReviewsToDataBase = async (dataToBeSaved) => {
  return fsPromises.writeFile(reviewsPath, JSON.stringify(dataToBeSaved))
}

const addReviewToDataBase = async (review) => {
  const data = require(reviewsPath)
  data.push(review)
  return saveReviewsToDataBase(data)
}

module.exports = {
  getReviewsFromDataBase,
  addReviewToDataBase,
  getReviewsArr,
  getSortedReviewsFromDataBase
}
