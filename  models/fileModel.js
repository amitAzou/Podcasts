const fsPromises = require('fs').promises
const config = require('config')
const path = require('path')
const filePath = path.resolve(__dirname, '../', config.filePath)
const reviewsPath = path.resolve(__dirname, '../', config.reviewsPath)

const getPodcastFromDataBase = (id) => {
  const data = require(filePath)
  const result = data.filter((podcast) => podcast.id === id)
  if (result.length === 0) {
    return null
  }
  return result
}

const getSortedDataFromDataBase = () => {
  const data = require(filePath)
  return data.sort((a, b) => b.id - a.id)
}

const savePodcastToDataBase = (dataToBeSaved) => {
  return fsPromises.writeFile(filePath, JSON.stringify(dataToBeSaved))
}

const addPodcastToDataBase = async (podcast) => {
  const data = require(filePath)
  data.push(podcast)
  return savePodcastToDataBase(data)
}

const updateDataBase = async (updatedPodcast, id) => {
  const data = require(filePath)
  const index = data.findIndex((podcast) => podcast.id === id)
  data[index] = { ...data[index], ...updatedPodcast }
  return savePodcastToDataBase(data)
}

const deleteFromDataBase = async (id) => {
  const data = require(filePath)
  const updatedData = data.filter((podcast) => podcast.id !== id)
  return savePodcastToDataBase(updatedData)
}

const searchPodcastInDataBase = async (query) => {
  const data = require(filePath)
  return data.filter((podcast) => podcast.author.toLocaleLowerCase().includes(query) || podcast.title.toLocaleLowerCase().includes(query))
}

const getBestPodcastsFromDataBase = async (number) => {
  const data = require(filePath)
  const ratingArr = await getRatingsArr()
  const result = []
  for (let i = 0; i < number && i < ratingArr.length; i++) {
    result.push(data.find((podcast) => podcast.id === ratingArr[i].id))
  }
  return result
}

const getRatingsArr = async () => {
  const data = require(reviewsPath)
  data.sort((a, b) => a.podcastId - b.podcastId)

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
  return ratingArr.sort((a, b) => b.rating - a.rating)
}

module.exports = {
  getPodcastFromDataBase,
  savePodcastToDataBase,
  getSortedDataFromDataBase,
  addPodcastToDataBase,
  updateDataBase,
  deleteFromDataBase,
  searchPodcastInDataBase,
  getBestPodcastsFromDataBase
}
