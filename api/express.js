require('dotenv').config()

const express = require('express');
const cors = require('cors')
const app = express();

const tasks = require('./src/controllers/tasks')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/tasks', tasks)
app.get('/', (req, res) => {
  res.send('api initialization');
});

module.exports = app
