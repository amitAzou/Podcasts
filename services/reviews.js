const { getReviewsFromDataBase, addReviewToDataBase } = require('../ models/reviewsFileModel')
const { getPodcastFromDataBase } = require('../ models/podcastFileModel')

const getItem = async (id) => {
  return getReviewsFromDataBase(id)
}

const addNewItem = async (podcast) => {
  return addReviewToDataBase(podcast)
}

const isItemExisting = (id) => {
  return getPodcastFromDataBase(id)
}
module.exports = { getItem, addNewItem, isItemExisting }
