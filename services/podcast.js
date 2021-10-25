const {
  getSortedDataFromDataBase, addPodcastToDataBase, getPodcastFromDataBase, updateDataBase, deleteFromDataBase, searchPodcastInDataBase,
  getReviewsArr
} = require('../ models/podcastFileModel')

const getItem = (id) => {
  return getPodcastFromDataBase(id)
}

const getIdNumber = () => {
  const sortedData = getSortedDataFromDataBase()
  return sortedData.length ? sortedData[0].id + 1 : 1
}

const addNewPodcast = async (podcast) => {
  return addPodcastToDataBase(podcast)
}

const updateData = async (podcast, id) => {
  return updateDataBase(podcast, id)
}

const deleteData = async (id) => {
  return deleteFromDataBase(id)
}

const searchItem = async (query) => {
  return searchPodcastInDataBase(query)
}

const getBestItems = async (number) => {
  const dataBase = getSortedDataFromDataBase()
  const reviewsArr = await getReviewsArr()
  const ratingArr = await getRatingsArr(reviewsArr)
  const result = []
  for (let i = 0; i < number && i < ratingArr.length; i++) {
    result.push(dataBase.find((podcast) => podcast.id === ratingArr[i].id))
  }
  return result
}

const getRatingsArr = async (data) => {
  let sum = data[0].rating
  let counter = 1
  const ratingArr = []
  for (let i = 1; i < data.length; i++) {
    if (data[i].podcastId === data[i - 1].podcastId) {
      sum += data[i].rating
      counter++
    } else {
      ratingArr.push({ id: data[i - 1].podcastId, rating: sum / counter })
      sum = data[i].rating
      counter = 1
    }
  }
  ratingArr.push({ id: data[data.length - 1].podcastId, rating: sum / counter })
  return ratingArr.sort((a, b) => b.rating - a.rating)
}
module.exports = {
  getItem,
  getIdNumber,
  addNewPodcast,
  updateData,
  deleteData,
  searchItem,
  getBestItems,
  getRatingsArr
}
