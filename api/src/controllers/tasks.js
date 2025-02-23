
const taskModule = require('../models/task')
const express = require("express");
const router = express.Router();
const { DataTypes } = require('sequelize');
const db = require('../database')
const Task = taskModule(db, DataTypes)

router.get("/", async (req, res) => {
  const perPage = Math.min(req.query.perPage || 20, 100)
  const page = Math.max(req.query.page || 1, 1)

  const tasks = await Task.findAll({
    order: ['createdAt'],
    limit: perPage,
    offset: (page - 1) * perPage
  });

  res.send(tasks);
});

router.post("/", async (req, res) => {
  const {
    title,
    completed
  } = req.body

  try {
    const task = await Task.create({
      title,
      completed
    })

    res.statusCode = 201
    res.send(task)
  } catch (err) {
    console.error(err)
    res.statusCode = 500
    res.send('something went wrong')
  }
})

router.patch("/:id", async (req, res) => {
  const id = req.params.id
  const {
    title,
    completed
  } = req.body

  try {
    await Task.update({
      title,
      completed
    }, {
      where: {
        id
      }
    })

    res.statusCode = 200
    res.send('task updated successfully')
  } catch (err) { 
    console.error(err)
    res.statusCode = 500
    res.send('something went wrong')
  }
})

router.delete("/:id", async (req, res) => {
  const id = req.params.id

  try {
    Task.destroy({
      where: {
        id
      }
    })

    res.statusCode = 204
    res.send('task deleted successfully')
  } catch (err) {
    console.error(err)
    res.statusCode = 500
    res.send('something went wrong')
  }
})

module.exports = router
