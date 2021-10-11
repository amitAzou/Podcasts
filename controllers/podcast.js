const { getItem, getIdNumber, addNewPodcast, updateData, deleteData } = require('../services/podcast')

const getPodcast = async (req, res) => {
  const result = getItem(parseInt(req.params.id))
  if (!result) {
    res.status(404).send('This podcast does not exist')
  } else {
    res.status(200).send(result)
  }
}

const addPodcast = async (req, res) => {
  try {
    const id = getIdNumber()
    await addNewPodcast({ ...req.body, ...{ id } })
    res.status(200).send('The podcast has been added')
  } catch (err) {
    res.status(501).send('Something went wrong, could not save podcast')
  }
}

const updatePodcast = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const result = getItem(id)
    if (!result) {
      return res.status(404).send('This podcast does not exist')
    } else {
      await updateData(req.body, id)
      return res.status(200).send('The podcast has been updated successfully')
    }
  } catch (err) {
    return res.status(501).send('Something went wrong, could not update podcast')
  }
}

const deletePodcast = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const result = getItem(id)
    if (!result) {
      return res.status(501).send('This podcast does not exist')
    } else {
      await deleteData(id)
      return res.status(200).send('The podcast has been deleted successfully')
    }
  } catch (err) {
    return res.status(501).send('Something went wrong, could not delete podcast')
  }
}

module.exports = {
  getPodcast,
  addPodcast,
  updatePodcast,
  deletePodcast
}
