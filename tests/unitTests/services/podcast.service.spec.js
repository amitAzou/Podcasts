const podcastDataBaseModel = require('../../../ models/podcastDataBaseModel')
const reviewsDataBaseModel = require('../../../ models/reviewsDataBaseModel')
jest.mock('../../../ models/podcastDataBaseModel')
jest.mock('../../../ models/reviewsDataBaseModel')

const { getItem, getIdNumber, addNewPodcast, updateData, deleteData, searchItem, getBestItems } = require('../../../services/podcast')
const { mockedDataBaseForBestPodcasts, mockedReviewsForPodcasts, resultForBestPodcastCalledWith1, resultForBestPodcastCalledWith2 } = require('./mock')

describe('Unit Tests', () => {
  describe('Tests for podcast services', () => {
    it('It should call the function getPodcastFromDataBase when getItem service is called', async () => {
      const spy = jest.spyOn(podcastDataBaseModel, 'getPodcastFromDataBase').mockImplementation(() => Promise.resolve())
      await getItem(1)
      expect(spy).toHaveBeenCalled()
    })

    it('It should call the function getSortedDataFromDataBase when getIdNumber service is called', () => {
      const spy = jest.spyOn(podcastDataBaseModel, 'getSortedDataFromDataBase').mockImplementation(() => 1)
      getIdNumber()
      expect(spy).toHaveBeenCalled()
    })

    it('It should call the function getPodcastFromDataBase when addNewPodcast service is called', async () => {
      const spy = jest.spyOn(podcastDataBaseModel, 'addPodcastToDataBase').mockImplementation(() => Promise.resolve())
      await addNewPodcast({})
      expect(spy).toHaveBeenCalled()
    })

    it('It should call the function updateDataBase when updateData service is called', async () => {
      const spy = jest.spyOn(podcastDataBaseModel, 'updateDataBase').mockImplementation(() => Promise.resolve())
      await updateData({})
      expect(spy).toHaveBeenCalled()
    })

    it('It should call the function deleteFromDataBase when deleteData service is called', async () => {
      const spy = jest.spyOn(podcastDataBaseModel, 'deleteFromDataBase').mockImplementation(() => Promise.resolve())
      await deleteData(1)
      expect(spy).toHaveBeenCalled()
    })

    it('It should call the function searchPodcastInDataBase when searchItem is called', async () => {
      const spy = jest.spyOn(podcastDataBaseModel, 'searchPodcastInDataBase').mockImplementation(() => Promise.resolve())
      await searchItem('test')
      expect(spy).toHaveBeenCalled()
    })
  })
  describe('Tests for reviews', () => {
    it('It should call the function getReviewsArr and getSortedDataFromDataBase when getBestItems is called', async () => {
      const spy1 = jest.spyOn(podcastDataBaseModel, 'getSortedDataFromDataBase').mockImplementation(() => mockedDataBaseForBestPodcasts)
      const spy2 = jest.spyOn(reviewsDataBaseModel, 'getReviewsArr').mockImplementation(() => mockedReviewsForPodcasts)
      await getBestItems('1')
      expect(spy1).toHaveBeenCalled()
      expect(spy2).toHaveBeenCalled()
    })

    it('It should get the result: resultForBestPodcastCalledWith1 with a call for the best podcast ', async () => {
      jest.spyOn(podcastDataBaseModel, 'getSortedDataFromDataBase').mockImplementation(() => mockedDataBaseForBestPodcasts)
      jest.spyOn(reviewsDataBaseModel, 'getReviewsArr').mockImplementation(() => mockedReviewsForPodcasts)
      const result = await getBestItems('1')
      expect(result).toStrictEqual(resultForBestPodcastCalledWith1)
    })

    it('It should get the result: resultForBestPodcastCalledWith2 with a call for two best podcast ', async () => {
      jest.spyOn(podcastDataBaseModel, 'getSortedDataFromDataBase').mockImplementation(() => mockedDataBaseForBestPodcasts)
      jest.spyOn(reviewsDataBaseModel, 'getReviewsArr').mockImplementation(() => mockedReviewsForPodcasts)
      const result = await getBestItems('2')
      expect(result).toStrictEqual(resultForBestPodcastCalledWith2)
    })
  })
})
