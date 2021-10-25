const supertest = require('supertest')
const app = require('../../../app')

jest.mock('../../../ models/podcastFileModel', () => ({
  getReviewsFromDataBase: (id) => id === 1 ? [] : null,
  addPodcastToDataBase: () => 'Added!',
  updateDataBase: (podcast, id) => id === 1 ? [] : null,
  deleteFromDataBase: (id) => id === 1 ? [] : null,
  searchPodcastInDataBase: (query) => query === 'test' ? [1] : [],
  getReviewsArr: () => []
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
})
