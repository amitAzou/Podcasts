const { getItem, addNewPodcast, updateData, deleteData, searchItem, getBestItems } = require('../services/podcast')

const getPodcast = async (req, res, next) => {
  try {
    const result = await getItem(parseInt(req.params.id))
    if (!result) {
      return res.status(404).send('This podcast does not exist')
    } else {
      return res.status(200).send(result)
    }
  } catch (err) {
    return next(err)
  }
}

const addPodcast = async (req, res, next) => {
  try {
    await addNewPodcast(req.body)
    return res.status(200).send('The podcast has been added')
  } catch (err) {
    return next(err)
  }
}

const updatePodcast = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id)
    const result = await updateData(req.body, id)
    if (result.affectedRows !== 0) {
      return res.status(200).send('The podcast has been updated successfully')
    } else {
      return res.status(404).send('The podcast does not exist')
    }
  } catch (err) {
    return next(err)
  }
}

const deletePodcast = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id)
    const result = await deleteData(id)
    if (result.affectedRows !== 0) {
      return res.status(200).send('The podcast has been deleted successfully')
    } else {
      return res.status(404).send('This podcast does not exist')
    }
  } catch (err) {
    return next(err)
  }
}

const searchPodcast = async (req, res, next) => {
  try {
    const query = req.params.query.toLowerCase()
    const result = await searchItem(query)
    if (result.length === 0) {
      return res.status(404).send('There are no podcasts containing these keywords')
    } else {
      return res.status(200).send(result)
    }
  } catch (err) {
    return next(err)
  }
}

const getBestPodcasts = async (req, res, next) => {
  try {
    const number = parseInt(req.params.number)
    const result = await getBestItems(number)
    if (result.length === 0) {
      return res.status(404).send('There are no ratings for any podcast')
    } else {
      return res.status(200).send(result)
    }
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  getPodcast,
  addPodcast,
  updatePodcast,
  deletePodcast,
  searchPodcast,
  getBestPodcasts
}
