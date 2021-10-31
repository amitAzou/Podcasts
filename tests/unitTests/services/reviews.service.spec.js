const reviewsFileModel = require('../../../ models/reviewsFileModel')
const { getItem } = require('../../../services/reviews')

jest.mock('../../../ models/reviewsFileModel')

describe('Unit Tests', () => {
  describe('Tests for podcast services', () => {
    it('It should call the function getReviewsFromDataBase when getItem service is called', async () => {
      const spy = jest.spyOn(reviewsFileModel, 'getReviewsFromDataBase').mockImplementation(() => Promise.resolve())
      await getItem(1)
      expect(spy).toHaveBeenCalled()
    })
  })
})
