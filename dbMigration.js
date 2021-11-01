const mysql = require('./utils/mysql')
const podcasts = require('./data/podcasts.json')
const reviews = require('./data/reviews.json')

async function migrate () {
  try {
    // await mysql.runQuery(`CREATE TABLE \`podcasts\`.\`users\` (
    //                           \`id\` INT(10) NOT NULL AUTO_INCREMENT,
    //                           \`username\` VARCHAR(255) NOT NULL,
    //                           \`password\` VARCHAR(8) NOT NULL,
    //                            PRIMARY KEY (\`id\`));
    // `)
    //
    // await mysql.runQuery(`CREATE TABLE \`podcasts\`.\`podcasts\` (
    //                           \`id\` INT(10) NOT NULL AUTO_INCREMENT,
    //                           \`title\` TEXT NOT NULL,
    //                           \`author\` VARCHAR(255) NOT NULL,
    //                           \`description\` TEXT NOT NULL,
    //                           \`htmlDescription\` TEXT NULL,
    //                           \`webUrl\` TEXT NOT NULL,
    //                           \`imageUrl\` TEXT NOT NULL,
    //                           \`language\` VARCHAR(45) NOT NULL,
    //                           \`numberOfEpisodes\` INT(10) NOT NULL,
    //                           \`avgEpisodeLength\` INT(10) NOT NULL,
    //                           \`category\` VARCHAR(45) NOT NULL,
    //                           PRIMARY KEY (\`id\`));
    // `)
    //
    // await mysql.runQuery(`CREATE TABLE \`podcasts\`.\`reviews\` (
    //                           \`rating\` FLOAT(1) NOT NULL,
    //                           \`id\` INT(10) NOT NULL AUTO_INCREMENT,
    //                           \`podcastId\` INT(10) NOT NULL,
    //                           \`text\` TEXT NOT NULL,
    //                           PRIMARY KEY (\`id\`),
    //                           INDEX \`podcast_fk_idx\` (\`podcastId\` ASC),
    //                           CONSTRAINT \`podcast_fk\`
    //                            FOREIGN KEY (\`podcastId\`)
    //                            REFERENCES \`podcasts\`.\`podcasts\` (\`id\`)
    //                            ON DELETE NO ACTION
    //                            ON UPDATE NO ACTION);
    // `)

    await Promise.all(podcasts.map((podcast) => {
      return mysql.runQuery('INSERT INTO `podcasts`.`podcasts` (id, title, description, htmlDescription, webUrl, imageUrl, language, numberOfEpisodes, avgEpisodeLength, author, category )  VALUES (?,?, ? ,? ,? ,? ,? ,?, ?, ?, ?)',
        [podcast.id, podcast.title, podcast.description, podcast.htmlDescription, podcast.webUrl, podcast.imageUrl, podcast.language, podcast.numberOfEpisodes, podcast.avgEpisodeLength, podcast.author, podcast.category])
    }))

    await Promise.all(reviews.map((review) => {
      return mysql.runQuery('INSERT INTO `podcasts`.`reviews` (rating, text, podcastId, id )  VALUES (?,?,?,?)',
        [review.rating, review.text, review.podcastId, review.id])
    }))
    console.log('migration ended successfully')
  } catch (err) {
    console.log('error when running migration', err)
  }
}

migrate()
