const express = require('express')
const app = express()
const fsPromises = require('fs').promises
const port = 3000
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const joi = require('joi')
const dbFileName = './data/podcasts.json'

app.listen(port)

function validateId (input) {
  const schema = joi.object(
    {
      id: joi.number().integer().required()
    }
  )
  return schema.validate(input)
}

function validatePodcastUpdate (input) {
  const schema = joi.object().keys(
    {
      id: joi.number().integer(),
      title: joi.string(),
      description: joi.string(),
      htmlDescription: joi.string(),
      webUrl: joi.string(),
      imageUrl: joi.string(),
      language: joi.string(),
      numberOfEpisodes: joi.number().integer(),
      avgEpisodeLength: joi.number().integer(),
      author: joi.string(),
      category: joi.string()
    })
  return schema.validate(input)
}

function validatePodcastAdd (input) {
  const schema = joi.object().keys(
    {
      id: joi.number().integer().required(),
      title: joi.string().required(),
      description: joi.string().required(),
      htmlDescription: joi.string().required(),
      webUrl: joi.string().required(),
      imageUrl: joi.string().required(),
      language: joi.string().required(),
      numberOfEpisodes: joi.number().integer().required(),
      avgEpisodeLength: joi.number().integer().required(),
      author: joi.string().required(),
      category: joi.string().required()
    })
  return schema.validate(input)
}

function filterById (id) {
  const data = require(dbFileName)
  const result = data.filter((podcast) => podcast.id === id)
  if (result.length === 0) {
    return null
  }
  return result
}

function writePodcastToDb (dataToBeSaved) {
  return fsPromises.writeFile(dbFileName, JSON.stringify(dataToBeSaved))
}

async function deletePodcast (id) {
  const data = require(dbFileName)
  const updatedData = data.filter((podcast) => podcast.id !== id)
  return writePodcastToDb(updatedData)
}

async function addNewPodcast (podcast) {
  const data = require(dbFileName)
  data.push(podcast)
  return writePodcastToDb(data)
}

async function updatePodcast (updatedPodcast) {
  const data = require(dbFileName)
  const index = data.findIndex((podcast) => podcast.id === updatedPodcast.id)
  data[index] = { ...data[index], ...updatedPodcast }
  return writePodcastToDb(data)
}

app.get('/podcast/:id', (req, res) => {
  const validInputStatus = validateId(req.params)
  if (validInputStatus.error) {
    res.status(400).send('Please enter a numeric id')
  } else {
    const result = filterById(parseInt(req.params.id))
    if (!result) {
      res.status(404).send('This podcast does not exist')
    } else {
      res.status(200).send(result)
    }
  }
})

app.post('/podcast/new', async (req, res) => {
  try {
    const data = require(dbFileName)
    const sortedData = data.sort((a, b) => b.id - a.id)
    const id = sortedData.length ? sortedData[0].id + 1 : 1
    const validInputStatus = validatePodcastAdd({ ...req.body, ...{ id } })
    if (validInputStatus.error) {
      return res.status(400).send('Please make sure all fields are included in body')
    }
    await addNewPodcast(req.body)
    res.status(200).send('The podcast has been added')
  } catch (err) {
    res.status(501).send('Something went wrong, could not save podcast')
  }
})

app.delete('/podcast/:id', async (req, res) => {
  try {
    const validInputStatus = validateId(req.params)
    if (validInputStatus.error) {
      return res.status(400).send('Please enter a numeric id')
    } else {
      const id = parseInt(req.params.id)
      const result = filterById(id)
      if (!result) {
        return res.status(501).send('This podcast does not exist')
      } else {
        await deletePodcast()
        return res.status(200).send('The podcast has been deleted successfully')
      }
    }
  } catch (err) {
    return res.status(501).send('Something went wrong, could not delete podcast')
  }
})

app.put('/podcast/:id', async (req, res) => {
  try {
    const validInputStatus = validateId(req.params)
    if (validInputStatus.error) {
      return res.status(400).send('Please enter a numeric id')
    } else {
      const validInputStatus = validatePodcastUpdate(req.body)
      if (validInputStatus.error) {
        return res.status(400).send('Only valid fields are allowed')
      } else {
        const result = filterById(parseInt(req.params.id))
        if (!result) {
          return res.status(404).send('This podcast does not exist')
        } else {
          await updatePodcast(req.body)
          return res.status(200).send('The podcast has been updated successfully')
        }
      }
    }
  } catch (err) {
    return res.status(501).send('Something went wrong, could not update podcast')
  }
})

console.log(`listening on port ${port}...`)
