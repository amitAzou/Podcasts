const mysql = require('../utils/mysql')

const getPodcastFromDataBase = async (id) => {
  const result = await mysql.runQuery('SELECT * FROM `podcasts`.`podcasts` WHERE id = ?', [id])
  return result[0]
}

const getSortedDataFromDataBase = async () => {
  const data = await mysql.runQuery('SELECT * FROM `podcasts`.`podcasts`')
  return data.sort((a, b) => b.id - a.id)
}

const addPodcastToDataBase = async (podcast) => {
  return await mysql.runQuery(
    'INSERT INTO `podcasts`.`podcasts` (title, description, htmlDescription, webUrl, imageUrl, language, numberOfEpisodes, avgEpisodeLength, author, category )  VALUES (?, ? ,? ,? ,? ,? ,?, ?, ?, ?)',
    [podcast.title, podcast.description, podcast.htmlDescription, podcast.webUrl, podcast.imageUrl, podcast.language, podcast.numberOfEpisodes, podcast.avgEpisodeLength, podcast.author, podcast.category])
}

const updateDataBase = async (updatedPodcast, id) => {
  const podcast = await getPodcastFromDataBase(id)
  const result = { ...JSON.parse(JSON.stringify(podcast)), ...updatedPodcast }
  return await mysql.runQuery(
    'UPDATE  `podcasts`.`podcasts` SET title=?, description=?, htmlDescription=?, webUrl=?, imageUrl=?, language=?, numberOfEpisodes=?, avgEpisodeLength=?, author=?, category=? WHERE id=?',
    [result.title, result.description, result.htmlDescription, result.webUrl, result.imageUrl, result.language, result.numberOfEpisodes, result.avgEpisodeLength, result.author, result.category, id]
  )
}

const deleteFromDataBase = async (id) => {
  await mysql.runQuery(
    'DELETE FROM `podcasts`.`podcasts` WHERE id=?', [id]
  )
}

const searchPodcastInDataBase = async (query) => {
  const adjustQuery = '%'.concat(query).concat('%')
  return await mysql.runQuery(
    'SELECT * FROM `podcasts`.`podcasts` WHERE author  LIKE ? OR title LIKE ?', [adjustQuery, adjustQuery])
}

module.exports = {
  getPodcastFromDataBase,
  getSortedDataFromDataBase,
  addPodcastToDataBase,
  updateDataBase,
  deleteFromDataBase,
  searchPodcastInDataBase
}
