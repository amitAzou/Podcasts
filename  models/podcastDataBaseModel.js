const mysql = require('../utils/mysql')
const {S3Client, PutObjectCommand} = require('@aws-sdk/client-s3')
const config = require('config')

const saveItemToS3 = async (item) => {
  const s3Client = new S3Client({})
  const params = {
    ACL: 'public-read',
    Bucket: config.s3.bucket,
    Key: 'aura_bootcamp/amit/data',
    Body: JSON.stringify(item),
  }
  try {
    const results = await s3Client.send(new PutObjectCommand(params))
    console.log(results)
    return results
  } catch (err) {
    console.error(err)
    return null
  }
}

const getPodcastFromDataBase = async (id) => {
  const result = await mysql.runQuery(
    'SELECT * FROM `podcasts`.`podcasts` WHERE id = ?',
    [id]
  )
  return result[0]
}

const getSortedDataFromDataBase = async () => {
  return await mysql.runQuery('SELECT * FROM `podcasts`.`podcasts` ORDER BY id')
}

const addPodcastToDataBase = async (podcast) => {
  return await mysql.runQuery(
    'INSERT INTO `podcasts`.`podcasts` (title, description, htmlDescription, webUrl, imageUrl, language, numberOfEpisodes, avgEpisodeLength, author, category )  VALUES (?, ? ,? ,? ,? ,? ,?, ?, ?, ?)',
    [
      podcast.title,
      podcast.description,
      podcast.htmlDescription,
      podcast.webUrl,
      podcast.imageUrl,
      podcast.language,
      podcast.numberOfEpisodes,
      podcast.avgEpisodeLength,
      podcast.author,
      podcast.category,
    ]
  )
}

const updateDataBase = async (result, id) => {
  return await mysql.runQuery(
    'UPDATE  `podcasts`.`podcasts` SET title=COALESCE(?,title), description=COALESCE(?,description), htmlDescription=COALESCE(?,htmlDescription), webUrl=COALESCE(?,webUrl), imageUrl=COALESCE(?,imageUrl), language=COALESCE(?,language), numberOfEpisodes=COALESCE(?,numberOfEpisodes), avgEpisodeLength=COALESCE(?,avgEpisodeLength), author=COALESCE(?,author), category=COALESCE(?,category) WHERE id=?',
    [
      result.title,
      result.description,
      result.htmlDescription,
      result.webUrl,
      result.imageUrl,
      result.language,
      result.numberOfEpisodes,
      result.avgEpisodeLength,
      result.author,
      result.category,
      id,
    ]
  )
}

const deleteFromDataBase = async (id) => {
  return await mysql.runQuery('DELETE FROM `podcasts`.`podcasts` WHERE id=?', [
    id,
  ])
}

const searchPodcastInDataBase = async (query) => {
  const adjustQuery = '%'.concat(query).concat('%')
  return await mysql.runQuery(
    'SELECT * FROM `podcasts`.`podcasts` WHERE author LIKE ? OR title LIKE ?',
    [adjustQuery, adjustQuery]
  )
}

module.exports = {
  getPodcastFromDataBase,
  getSortedDataFromDataBase,
  addPodcastToDataBase,
  updateDataBase,
  deleteFromDataBase,
  searchPodcastInDataBase,
  saveItemToS3,
}
