const fileModel = require('../../../ models/fileModel')
const { getItem, getIdNumber, addNewPodcast, updateData, deleteData } = require('../../../services/podcast')

jest.mock('../../../ models/fileModel')

describe('Unit Tests', () => {
  describe('Tests for podcast services', () => {
    it('It should call the function getPodcastFromDataBase when getItem service is called', async () => {
      const spy = jest.spyOn(fileModel, 'getPodcastFromDataBase').mockImplementation(() => Promise.resolve())
      await getItem(1)
      expect(spy).toHaveBeenCalled()
    })

    it('It should call the function getSortedDataFromDataBase when getIdNumber service is called', () => {
      const spy = jest.spyOn(fileModel, 'getSortedDataFromDataBase').mockImplementation(() => 1)
      getIdNumber()
      expect(spy).toHaveBeenCalled()
    })

    it('It should call the function getPodcastFromDataBase when addNewPodcast service is called', async () => {
      const spy = jest.spyOn(fileModel, 'addPodcastToDataBase').mockImplementation(() => Promise.resolve())
      await addNewPodcast({})
      expect(spy).toHaveBeenCalled()
    })

    it('It should call the function updateDataBase when updateData service is called', async () => {
      const spy = jest.spyOn(fileModel, 'updateDataBase').mockImplementation(() => Promise.resolve())
      await updateData({})
      expect(spy).toHaveBeenCalled()
    })

    it('It should call the function deleteFromDataBase when deleteData service is called', async () => {
      const spy = jest.spyOn(fileModel, 'deleteFromDataBase').mockImplementation(() => Promise.resolve())
      await deleteData(1)
      expect(spy).toHaveBeenCalled()
    })
  })
})
