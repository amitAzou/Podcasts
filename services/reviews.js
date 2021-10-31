const { getReviewsFromDataBase, addReviewToDataBase, getSortedReviewsFromDataBase } = require('../ models/reviewsFileModel')
const { getPodcastFromDataBase } = require('../ models/podcastFileModel')

const getIdNumber = () => {
  const sortedData = getSortedReviewsFromDataBase()
  return sortedData.length ? sortedData[0].id + 1 : 1
}

const getItem = async (id) => {
  return getReviewsFromDataBase(id)
}

const addNewItem = async (podcast) => {
  return addReviewToDataBase(podcast)
}

const isItemExisting = (id) => {
  return getPodcastFromDataBase(id)
}
module.exports = { getItem, addNewItem, isItemExisting, getIdNumber }
