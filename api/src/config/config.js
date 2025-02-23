require('dotenv').config()

module.exports = {
  development: {
    username: process.env.DB_USER || 'user',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '5432',
    dialect: 'postgresql',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  test: {
    username: process.env.TEST_DB_USER || 'user',
    password: process.env.TEST_DB_PASSWORD || 'password',
    database: process.env.TEST_DB_NAME || 'postgres',
    host: process.env.TEST_DB_HOST || 'localhost',
    port: process.env.TEST_DB_PORT || '5434',
    dialect: 'postgresql',
    dialectOptions: {
      bigNumberStrings: true,
    },
  }
}