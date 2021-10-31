const { getReviewsFromDataBase } = require('../ models/podcastFileModel')

const getItem = async (id) => {
  return getReviewsFromDataBase(id)
}

module.exports = { getItem }
