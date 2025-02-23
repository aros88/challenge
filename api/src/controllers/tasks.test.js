import { afterEach, beforeEach, describe, expect, test } from 'vitest';
const taskModule = require('../models/task')
const request = require('supertest')
const { DataTypes } = require('sequelize');
const db = require('../database')
const Task = taskModule(db, DataTypes)

const app = require('../../express')

app.listen(8081, () => {
  console.log('test server running on port 8081')
})

describe('tasks endpoints', () => {
  let tasks = []
  beforeEach(async () => {
    tasks = await Task.bulkCreate([
      {
        title: 'First Task',
        completed: false
      },
      {
        title: 'Second Task',
        completed: true
      }
    ])
  })

  afterEach(() => {
    Task.destroy({
      truncate: true
    })
  })

  test('returns list of tasks', async () => {
    const response = await request(app)
      .get('/tasks')

    expect(response.status).toEqual(200)
    expect(response.body.length).toEqual(2)
    tasks.forEach((t, i) => {
      expect(response.body[i].id).toEqual(t.id)
      expect(response.body[i].title).toEqual(t.title)
      expect(response.body[i].completed).toEqual(t.completed)
    })
  })

  test('creates a task', async () => {
    const response = await request(app)
      .post('/tasks')
      .send({
        title: 'Test Task',
        completed: false
      })

    expect(response.status).toEqual(201)
    expect(response.body.title).toEqual('Test Task')
    expect(response.body.completed).toEqual(false)
  })

  test('updates a task', async () => {
    const taskId = tasks[0].id
    const response = await request(app)
      .patch(`/tasks/${taskId}`)
      .send({
        title: 'Updated Task',
        completed: false
      })

    expect(response.status).toEqual(200)

    const task = await Task.findByPk(taskId)
    expect(task.title).toEqual('Updated Task')
  })

  test('updates a task', async () => {
    const taskId = tasks[0].id
    const response = await request(app)
      .delete(`/tasks/${taskId}`)

    expect(response.status).toEqual(204)

    const task = await Task.findByPk(taskId)
    expect(task).toBeNull()
  })
})
