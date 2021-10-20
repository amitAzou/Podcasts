const supertest = require('supertest')
const { validObject, missingFieldsObject, extraFieldsObject, wrongFieldTypesObject } = require('./mock')
const app = require('../../../app')

jest.mock('../../../ models/fileModel', () => ({
  getPodcastFromDataBase: (id) => id === 1 ? [] : null,
  savePodcastToDataBase: () => 'Saved!',
  getSortedDataFromDataBase: () => [],
  addPodcastToDataBase: () => 'Added!',
  updateDataBase: (podcast, id) => id === 1 ? [] : null,
  deleteFromDataBase: (id) => id === 1 ? [] : null
}))

describe('Component Tests:', () => {
  describe('Adding a podcast tests:', () => {
    it('It should return 200 when POST request is called with all required fields', async () => {
      await supertest(app).post('/podcast/new').send(validObject).expect(200)
    })

    it('It should return 400 when POST request is called with missing required fields', async () => {
      await supertest(app).post('/podcast/new').send(missingFieldsObject).expect(400)
    })

    it('It should return 400 when POST request is called with extra fields', async () => {
      await supertest(app).post('/podcast/new').send(extraFieldsObject).expect(400)
    })

    it('It should return 400 when POST request is called with fields of wrong type', async () => {
      await supertest(app).post('/podcast/new').send(wrongFieldTypesObject).expect(400)
    })
  })

  describe('Get podcast tests:', () => {
    it('It should return 400 when GET request is called with a invalid id type', async () => {
      await supertest(app).get('/podcast/string').expect(400)
    })

    it('It should return 200 when GET podcast is called with a valid id ', async () => {
      await supertest(app).get('/podcast/1').expect(200)
    })

    it('It should return 404 when get podcast is called with an id that does not exist' +
        'in the DB', async () => {
      await supertest(app).get('/podcast/2').expect(404)
    })
  })

  describe('Update podcast tests', () => {
    it('It should return 400 when PUT request is called with an invalid id type', async () => {
      await supertest(app).put('/podcast/string').send(validObject).expect(400)
    })

    it('it should return 400 when PUT request is called with an extra fields in the body', async () => {
      await supertest(app).put('/podcast/1').send(extraFieldsObject).expect(400)
    })

    it('it should return 404 when update podcast is called with an id that does not exist' +
        'in DB', async () => {
      await supertest(app).put('/podcast/2').send(validObject).expect(404)
    })

    it('It should return 400 when POST request is called with extra fields', async () => {
      await supertest(app).put('/podcast/1').send(wrongFieldTypesObject).expect(400)
    })
  })

  describe('when sending a DELETE request the following should happen:', () => {
    it('it should return 404 when DELETE request is called with an invalid id type', async () => {
      await supertest(app).delete('/podcast/string').expect(400)
    })

    it('it should return 200 when DELETE request is called with an valid id', async () => {
      await supertest(app).delete('/podcast/1').expect(200)
    })

    it('it should return 404 when update podcast is called with an id that does not exist' +
        'in DB', async () => {
      await supertest(app).delete('/podcast/2').expect(404)
    })
  })
})