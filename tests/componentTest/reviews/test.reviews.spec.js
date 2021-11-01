const supertest = require('supertest')
const app = require('../../../app')
const { validReviewObject, missingFieldsReviewObject, invalidFieldsReviewObject, notExistingPodcast } = require('./mock')
const { mockedDataBaseForBestPodcasts, mockedReviewsForPodcasts } = require('../podcasts/mock')

jest.mock('../../../ models/podcastDataBaseModel', () => ({
  getSortedDataFromDataBase: () => mockedDataBaseForBestPodcasts,
  getPodcastFromDataBase: (id) => id === 1 ? [] : null
}))

jest.mock('../../../ models/reviewsDataBaseModel', () => ({
  getReviewsArr: () => mockedReviewsForPodcasts,
  getReviewsFromDataBase: (id) => id === 1 ? [] : null,
  addReviewToDataBase: () => 'Added',
  getSortedReviewsFromDataBase: () => []
}))

describe('Component Tests:', () => {
  describe('Getting a podcast review test', () => {
    it('It should return 200 when GET request is called with an id in that has reviews in reviews DB', async () => {
      await supertest(app).get('/reviews/get-by-podcast/1').expect(200)
    })

    it('It should return 400 when POST request is called with a wrong id type', async () => {
      await supertest(app).get('/reviews/get-by-podcast/string').expect(400)
    })

    it('It should return 404 when GET request is called with an id that has no reviews in DB', async () => {
      await supertest(app).get('/reviews/get-by-podcast/2').expect(404)
    })
  })

  describe('Adding a podcast review test', () => {
    it('It should return 200 when add review request is called with a valid id for a podcast that exists in DB', async () => {
      await supertest(app).post('/reviews/new').send(validReviewObject).expect(200)
    })

    it('It should return 400 when add review request is called with an object with invalid fields type(rating field)', async () => {
      await supertest(app).post('/reviews/new').send(invalidFieldsReviewObject).expect(400)
    })

    it('It should return 400 when add review request is called with an object with missing fields', async () => {
      await supertest(app).post('/reviews/new').send(missingFieldsReviewObject).expect(400)
    })

    it('It should return 404 when add review request is called with an id that doesnt exist in DB', async () => {
      await supertest(app).post('/reviews/new').send(notExistingPodcast).expect(404)
    })
  })
})
