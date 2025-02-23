require('dotenv').config()

const express = require('express');
const app = express();

const tasks = require('./src/controllers/tasks')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/tasks', tasks)
app.get('/', (req, res) => {
  res.send('api initialization');
});

module.exports = app
