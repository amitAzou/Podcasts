const { getReviewsFromDataBase, addReviewToDataBase } = require('../ models/reviewsDataBaseModel')
const { getPodcastFromDataBase } = require('../ models/podcastDataBaseModel')

const getItem = async (id) => {
  return getReviewsFromDataBase(id)
}

const addNewItem = async (podcast) => {
  return addReviewToDataBase(podcast)
}

const isItemExisting = async (id) => {
  return getPodcastFromDataBase(id)
}
module.exports = { getItem, addNewItem, isItemExisting }
