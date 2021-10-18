const supertest = require('supertest')
const express = require('express')
const router = require('../../../routes')
const { validObject, missingFieldsObject, extraFieldsObject } = require('./mock')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
app.use(router)

jest.mock('../../../ models/fileModel', () => ({
  getPodcastFromDataBase: (id) => id === 1 ? [] : null,
  savePodcastToDataBase: () => 'Saved!',
  getSortedDataFromDataBase: () => [],
  addPodcastToDataBase: () => 'Added!',
  updateDataBase: (podcast, id) => id === 1 ? [] : null,
  deleteFromDataBase: (id) => id === 1 ? [] : null
}))

describe('when sending a POST request (adding a podcast) the following should happen:', () => {
  it('when post podcast is called with required fields', async () => {
    await supertest(app).post('/podcast/new').send(validObject).expect('The podcast has been added')
  })

  it('when post podcast is called without required fields', async () => {
    await supertest(app).post('/podcast/new').send(missingFieldsObject).expect(400)
  })
})

describe('When sending a GET request the following should happen:', () => {
  it('when get podcast is called with a invalid id type it will return an error', async () => {
    await supertest(app).get('/podcast/string').expect(400, 'The parameters passed are invalid')
  })

  it('when get podcast is called without an id it will return 404 ', async () => {
    await supertest(app).get('/podcast').expect(404)
  })

  it('when get podcast is called with a valid id it will return 200', async () => {
    await supertest(app).get('/podcast/1').expect(200)
  })

  it('when get podcast is called with an id that is not in the DB it will return 404' +
      '(any number but 1 for tests)', async () => {
    await supertest(app).get('/podcast/2').expect(404)
  })
})

describe('when sending a PUT request (update podcast) the following should happen:', () => {
  it('when update podcast is called without an id in url params it will return 404', async () => {
    await supertest(app).put('/podcast').send(validObject).expect(404)
  })

  it('when update podcast is called with an invalid id type it will return 400 ', async () => {
    await supertest(app).put('/podcast/string').send(validObject).expect(400)
  })

  it('when update podcast is called with an invalid body it will return 400', async () => {
    await supertest(app).put('/podcast/1').send(extraFieldsObject).expect(400)
  })

  it('when update podcast is called with an invalid id it will return 404', async () => {
    await supertest(app).put('/podcast/2').send(validObject).expect(404)
  })
})

describe('when sending a DELETE request the following should happen:', () => {
  it('when delete podcast is called without an id in url params it will return 404', async () => {
    await supertest(app).delete('/podcast').expect(404)
  })

  it('when delete podcast is called with an invalid id type it will return 400 ', async () => {
    await supertest(app).delete('/podcast/string').expect(400)
  })

  it('when delete podcast is called with an valid id it will return 200', async () => {
    await supertest(app).delete('/podcast/1').expect(200)
  })
})
