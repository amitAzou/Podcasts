const podcastDataBaseModel = require('../../../ models/podcastDataBaseModel')
const reviewsDataBaseModel = require('../../../ models/reviewsDataBaseModel')
jest.mock('../../../ models/podcastDataBaseModel')
jest.mock('../../../ models/reviewsDataBaseModel')

const {
  getItem,
  getIdNumber,
  addNewPodcast,
  updateData,
  deleteData,
  searchItem,
  getSortedPodcastByRating,
} = require('../../../services/podcast')

const {
  mockedDataBaseForBestPodcasts,
  mockedReviewsForPodcasts,
  resultForBestPodcast,
} = require('./mock')

describe('Unit Tests', () => {
  describe('Tests for podcast services', () => {
    it('It should call the function getPodcastFromDataBase when getItem service is called', async () => {
      const spy = jest
        .spyOn(podcastDataBaseModel, 'getPodcastFromDataBase')
        .mockImplementation(() => Promise.resolve())
      await getItem(1)
      expect(spy).toHaveBeenCalled()
    })

    it('It should call the function getSortedDataFromDataBase when getIdNumber service is called', () => {
      const spy = jest
        .spyOn(podcastDataBaseModel, 'getSortedDataFromDataBase')
        .mockImplementation(() => 1)
      getIdNumber()
      expect(spy).toHaveBeenCalled()
    })

    it('It should call the function getPodcastFromDataBase when addNewPodcast service is called', async () => {
      const spy = jest
        .spyOn(podcastDataBaseModel, 'addPodcastToDataBase')
        .mockImplementation(() => Promise.resolve())
      await addNewPodcast({})
      expect(spy).toHaveBeenCalled()
    })

    it('It should call the function updateDataBase when updateData service is called', async () => {
      const spy = jest
        .spyOn(podcastDataBaseModel, 'updateDataBase')
        .mockImplementation(() => Promise.resolve())
      await updateData({})
      expect(spy).toHaveBeenCalled()
    })

    it('It should call the function deleteFromDataBase when deleteData service is called', async () => {
      const spy = jest
        .spyOn(podcastDataBaseModel, 'deleteFromDataBase')
        .mockImplementation(() => Promise.resolve())
      await deleteData(1)
      expect(spy).toHaveBeenCalled()
    })

    it('It should call the function searchPodcastInDataBase when searchItem is called', async () => {
      const spy = jest
        .spyOn(podcastDataBaseModel, 'searchPodcastInDataBase')
        .mockImplementation(() => Promise.resolve())
      await searchItem('test')
      expect(spy).toHaveBeenCalled()
    })
  })
  describe('Tests for reviews', () => {
    it('It should call the function getReviewsArr and getSortedDataFromDataBase when getBestItems is called', async () => {
      const spy1 = jest
        .spyOn(podcastDataBaseModel, 'getSortedDataFromDataBase')
        .mockImplementation(() => mockedDataBaseForBestPodcasts)
      const spy2 = jest
        .spyOn(reviewsDataBaseModel, 'getReviewsArr')
        .mockImplementation(() => mockedReviewsForPodcasts)
      await getSortedPodcastByRating()
      expect(spy1).toHaveBeenCalled()
      expect(spy2).toHaveBeenCalled()
    })

    it('It should get the result: resultForBestPodcast with a call for the best podcast ', async () => {
      jest
        .spyOn(podcastDataBaseModel, 'getSortedDataFromDataBase')
        .mockImplementation(() => mockedDataBaseForBestPodcasts)
      jest
        .spyOn(reviewsDataBaseModel, 'getReviewsArr')
        .mockImplementation(() => mockedReviewsForPodcasts)
      const result = await getSortedPodcastByRating()
      expect(result).toStrictEqual(resultForBestPodcast)
    })
  })
})
