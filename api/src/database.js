require('dotenv').config()
const { Sequelize } = require('sequelize')

let connectionUrl = process.env.DB_CONNECTION_URL
if (process.env.NODE_ENV === 'test') {
  connectionUrl = process.env.TEST_DB_CONNECTION_URL
}

module.exports = new Sequelize(connectionUrl)
