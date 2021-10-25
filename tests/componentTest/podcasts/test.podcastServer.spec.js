const supertest = require('supertest')
const { validObject, missingFieldsObject, extraFieldsObject, wrongFieldTypesObject, mockedDataBaseForBestPodcasts, mockedReviewsForPodcasts } = require('./mock')
const app = require('../../../app')

jest.mock('../../../ models/podcastFileModel', () => ({
  getPodcastFromDataBase: (id) => id === 1 ? [] : null,
  savePodcastToDataBase: () => 'Saved!',
  getSortedDataFromDataBase: () => mockedDataBaseForBestPodcasts,
  addPodcastToDataBase: () => 'Added!',
  updateDataBase: (podcast, id) => id === 1 ? [] : null,
  deleteFromDataBase: (id) => id === 1 ? [] : null,
  searchPodcastInDataBase: (query) => query === 'test' ? [1] : [],
  getReviewsArr: () => mockedReviewsForPodcasts
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

  describe('Search podcast tests:', () => {
    it('It should return 404 when search podcast request is called with a un-existing keyword of title or author', async () => {
      await supertest(app).get('/podcast/search/badTest').expect(404)
    })

    it('It should return 200 when search podcast is called with existing keyword in title or author', async () => {
      await supertest(app).get('/podcast/search/test').expect(200)
    })
  })

  describe('Get best podcasts tests:', () => {
    it('It should return 400 when get best podcast is called with a invalid number type', async () => {
      await supertest(app).get('/podcast/best/wrong').expect(400)
    })

    it('It should return 200 when get best podcast is called with a valid number type', async () => {
      await supertest(app).get('/podcast/best/1').expect(200)
    })
  })
})
