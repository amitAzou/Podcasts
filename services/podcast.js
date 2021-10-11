const { getSortedData, addPodcast, getPodcastFromDataBase, updateDataBase, deleteFromDataBase } = require('../ models/fileModel')

const getItem = (id) => {
  return getPodcastFromDataBase(id)
}

const getIdNumber = () => {
  const sortedData = getSortedData()
  return sortedData.length ? sortedData[0].id + 1 : 1
}

const addNewPodcast = async (podcast) => {
  return addPodcast(podcast)
}

const updateData = async (podcast, id) => {
  return updateDataBase(podcast, id)
}

const deleteData = async (id) => {
  return deleteFromDataBase(id)
}
module.exports = {
  getItem,
  getIdNumber,
  addNewPodcast,
  updateData,
  deleteData
}
