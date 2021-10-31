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

const getReviewsArr = async () => {
  const data = require(reviewsPath)
  return data.sort((a, b) => a.podcastId - b.podcastId)
}

module.exports = {
  getPodcastFromDataBase,
  savePodcastToDataBase,
  getSortedDataFromDataBase,
  addPodcastToDataBase,
  updateDataBase,
  deleteFromDataBase,
  searchPodcastInDataBase,
  getReviewsArr
}
