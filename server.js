const express=require('express')
const app=express()
const fsPromises=require('fs').promises
const port=3000
let data=require('./data/podcasts.json')
const bodyParser= require('body-parser')
app.use(bodyParser.json())
const joi = require('joi')
const dbFileName='./data/podcasts.json'
let idNumberToGive=1

app.listen(port)

function validateId(input) {
  const schema= joi.object(
      {
        id: joi.number().integer().required(),
      },
  )
  return schema.validate(input)
}

function validateInput(input) {
  const schema = joi.object().keys(
      {
        id: joi.number().integer().required().required(),
        title: joi.string().required(),
        description: joi.string().required(),
        htmlDescription: joi.string().required(),
        webUrl: joi.string().required(),
        imageUrl: joi.string().required(),
        language: joi.string().required(),
        numberOfEpisodes: joi.number().integer().required(),
        avgEpisodeLength: joi.number().integer().required(),
        author: joi.string().required(),
        category: joi.string().required(),
      })
  return schema.validate(input)
}

function filterById(id) {
  const result= data.filter((podcast)=>podcast.id===id)
  if (result.length===0) {
    return null
  }
  return result
}

function writePodToDb(dataToBeSaved) {
  try {
    return fsPromises.writeFile(dbFileName, JSON.stringify(dataToBeSaved))
  } catch (err) {
    console.error(err)
  }
}

async function deletePodcast(id) {
  const updatedData=data.filter((podcast)=>podcast.id!== id)
  await writePodToDb(updatedData)
  data=updatedData
}

async function addNewPodcast(podcast) {
  const updatedData=data
  updatedData.push(podcast)
  await writePodToDb(updatedData)
  data=updatedData
}

async function updatePodcast(updatedPodcast) {
  let podcastToUpdate=data.filter((podcast)=> podcast.id===updatedPodcast.id)[0]
  podcastToUpdate={...podcastToUpdate, ...updatedPodcast}
  const updatedPodcasts=data.filter((podcast)=>podcast.id!==podcastToUpdate.id)
  updatedPodcasts.push(podcastToUpdate)
  await writePodToDb(updatedPodcasts)
  data=updatedPodcasts
}


app.get('/podcast/:id', (req, res)=>{
  const validInputStatus=validateId(req.params)
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

app.post('/podcast/new', async (req, res)=>{
  req.body.id=idNumberToGive
  idNumberToGive+=1
  const validInputStatus=validateInput(req.body)
  if (validInputStatus.error) {
    res.status(400).send('Please make sure all fields are included in body')
  }
  await addNewPodcast(req.body)
  res.status(200).send('The podcast has been added')
})


app.delete('/podcast/:id', async (req, res)=>{
  const validInputStatus=validateId(req.params)
  if (validInputStatus.error) {
    res.status(400).send('Please enter a numeric id')
  } else {
    const result = filterById(parseInt(req.params.id))
    if (!result) {
      res.status(404).send('This podcast does not exist')
    } else {
      await deletePodcast(parseInt(req.params.id))
      res.status(200).send('The item has been deleted successfully')
    }
  }
})


app.put('/podcast/:id', async (req, res)=>{
  const validInputStatus=validateId(req.params)
  if (validInputStatus.error) {
    res.status(400).send('Please enter a numeric id')
  } else {
    const result = filterById(parseInt(req.params.id))
    if (!result) {
      res.status(404).send('This podcast does not exist')
    } else {
      await updatePodcast(req.body)
      res.status(200).send('The item has been updated successfully')
    }
  }
})


console.log(`listening on port ${port}...`)
