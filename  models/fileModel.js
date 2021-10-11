const fsPromises = require('fs').promises
const config = require('config')
const path = require('path')
const filePath = path.resolve(__dirname, '../', config.filePath)

const getPodcastFromDataBase = (id) => {
  const data = require(filePath)
  const result = data.filter((podcast) => podcast.id === id)
  if (result.length === 0) {
    return null
  }
  return result
}

const getSortedData = () => {
  const data = require(filePath)
  return data.sort((a, b) => b.id - a.id)
}

const savePodcast = (dataToBeSaved) => {
  return fsPromises.writeFile(filePath, JSON.stringify(dataToBeSaved))
}

const addPodcast = async (podcast) => {
  const data = require(filePath)
  data.push(podcast)
  return savePodcast(data)
}

const updateDataBase = async (updatedPodcast, id) => {
  console.log(updatedPodcast)
  const data = require(filePath)
  const index = data.findIndex((podcast) => podcast.id === id)
  data[index] = { ...data[index], ...updatedPodcast }
  return savePodcast(data)
}

const deleteFromDataBase = async (id) => {
  const data = require(filePath)
  const updatedData = data.filter((podcast) => podcast.id !== id)
  return savePodcast(updatedData)
}

module.exports = {
  getPodcastFromDataBase,
  savePodcast,
  getSortedData,
  addPodcast,
  updateDataBase,
  deleteFromDataBase
}
