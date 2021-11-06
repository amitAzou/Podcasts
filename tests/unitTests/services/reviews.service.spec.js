const reviewsDataBaseModel = require('../../../ models/reviewsDataBaseModel')
const { getItem } = require('../../../services/reviews')

jest.mock('../../../ models/reviewsDataBaseModel')

describe('Unit Tests', () => {
  describe('Tests for podcast services', () => {
    it('It should call the function getReviewsFromDataBase when getItem service is called', async () => {
      const spy = jest.spyOn(reviewsDataBaseModel, 'getReviewsFromDataBase').mockImplementation(() => Promise.resolve())
      await getItem(1)
      expect(spy).toHaveBeenCalled()
    })
  })
})
