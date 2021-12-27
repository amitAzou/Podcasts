const {
  getPodcastFromDataBase,
  getSortedDataFromDataBase,
  addPodcastToDataBase,
  updateDataBase,
  deleteFromDataBase,
  searchPodcastInDataBase,
  saveItemToS3,
} = require('../ models/podcastDataBaseModel')
const {getReviewsArr} = require('../ models/reviewsDataBaseModel')

const getItem = async (id) => {
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

const getSortedPodcastByRating = async () => {
  const dataBase = await getSortedDataFromDataBase()
  const reviewsArr = await getReviewsArr()
  const ratingArr = await getRatingsArr(reviewsArr)
  const result = []
  for (let i = 0; i < ratingArr.length; i++) {
    result.push(dataBase.find((podcast) => podcast.id === ratingArr[i][0]))
  }
  return result
}

const getRatingsArr = async (data) => {
  const ratingMap = new Map()
  for (let i = 0; i < data.length; i++) {
    const tempId = data[i].podcastId
    if (ratingMap.has(data[i].podcastId)) {
      const tempRatingObj = ratingMap.get(tempId)
      const tempSum = tempRatingObj.sum
      const tempCounter = tempRatingObj.counter
      ratingMap.set(tempId, {
        sum: tempSum + data[i].rating,
        counter: tempCounter + 1,
      })
    } else {
      ratingMap.set(tempId, {sum: data[i].rating, counter: 1})
    }
  }
  ratingMap.forEach((value) => {
    value.avg = value.sum / value.counter
  })
  return [...ratingMap.entries()].sort((a, b) => b[1].avg - a[1].avg)
}

const getBestPodcast = async (number) => {
  const sortedPodcasts = await getSortedPodcastByRating()
  const result = sortedPodcasts.slice(0, number)
  return await saveItemToS3(result)
}

module.exports = {
  getItem,
  getIdNumber,
  addNewPodcast,
  updateData,
  deleteData,
  searchItem,
  getSortedPodcastByRating,
  getRatingsArr,
  getBestPodcast,
}
