const mysql = require('mysql')
const config = require('config')

const connection = mysql.createConnection({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: 'podcasts',
  port: config.db.port
})

function runQuery (query, parameters = []) {
  return new Promise((resolve, reject) => {
    connection.query(query, parameters, (error, results) => {
      if (error) { reject(error) }
      resolve(results)
    })
  })
}

module.exports = { runQuery }
