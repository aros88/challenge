<script setup>
import { onMounted, ref } from 'vue';
import Todo from './Todo.vue';
import TodoForm from './TodoForm.vue';

const todoList = ref([]);
const loading = ref(false)

onMounted(async () => {
  await fetchTodos()
})

const fetchTodos = async () => {
  loading.value = true

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`)
    if (response.ok) {
      const todos = await response.json()

      todoList.value = todos.map(todo => {
        return {
          id: todo.id,
          title: todo.title,
          completed: todo.completed,
          editing: false
        }
      })

      loading.value = false
    } else {
      console.error('error fetching data')
    }
  } catch (err) {
    console.error('error fetching data')
  } finally {
    loading.value = false
  }
}

const createTodo = async (title) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        completed: false
      })
    })

    if (response.ok) {
      await fetchTodos()
    }
  } catch (err) {
    console.log(err)
  }
}

const setEditing = (id) => {
  const todo = todoList.value.find(t => t.id === id)

  todo.editing = true
  todoList.value.filter(t => t.id !== id).forEach(t => t.editing = false)
}

const completeTodo = async (id) => {
  const todo = todoList.value.find(t => t.id === id)

  console.log(todo, id)
  await updateTodo(id, todo.title, !todo.completed)
}

const updateTodo = async (id, title, completed) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id,
        title,
        completed
      })
    })

    if (response.ok) {
      await fetchTodos()
    }
  } catch (err) {
    console.error(err)
  }
}

const deleteTodo = async (id) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.ok) {
      await fetchTodos()
    }
  } catch (err) {
    console.error(err)
  }
}

const disableEditing = () => {
  todoList.value.forEach(t => {
    t.editing = false
  })
}
</script>

<template>
  <div>
    <h2>Todos</h2>
    <TodoForm
      @create-todo="createTodo"
      @create-todo-focused="disableEditing"
    />
    <Todo
      v-show="!loading"
      v-for="todo in todoList"
      :id="todo.id"
      :title="todo.title"
      :completed="todo.completed"
      :editing="todo.editing"
      @edit-todo="setEditing"
      @complete-todo="completeTodo"
      @delete-todo="deleteTodo"
      @update-todo="updateTodo"
    />
    <h4 v-show="loading">Loading...</h4>
  </div>
</template>

<style scoped>
</style>
