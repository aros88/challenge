<script setup>
import { onMounted, reactive, ref } from 'vue';
import Todo from './Todo.vue';
import TodoForm from './TodoForm.vue';
import IconInfo from './icons/IconInfo.vue';

const reRenderKey = ref(0)
const unmodifiedTodos = ref([]);
const state = reactive({
  todos: []
});
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

      unmodifiedTodos.value = todos.map(todo => {
        return {
          id: todo.id,
          title: todo.title,
          completed: todo.completed,
          editing: false
        }
      })
      state.todos = unmodifiedTodos.value.map(t => {
        return {
          ...t
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
      const todo = response.json()
      state.todos.push({
        ...todo,
        editing: false
      })
      reRenderKey.value = reRenderKey.value + 1
    }
  } catch (err) {
    console.log(err)
  }
}

const setEditing = (id) => {
  const todo = state.todos.find(t => t.id === id)

  todo.editing = true
  state.todos.filter(t => t.id !== id).forEach(t => t.editing = false)
  reRenderKey.value += 1
}

const completeTodo = async (id) => {
  const todo = state.todos.find(t => t.id === id)

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
      const todo = state.todos.find(t => t.id === id)
      todo.title = title
      todo.completed = completed
      todo.editing = false
      reRenderKey.value = reRenderKey.value + 1
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
      state.todos = state.todos.filter(t => t.id !== id)
      reRenderKey.value = reRenderKey.value + 1
    }
  } catch (err) {
    console.error(err)
  }
}

const disableEditing = () => {
  state.todos = state.todos.map(t => {
    return {
      ...t,
      editing: false
    }
  })
  reRenderKey.value = reRenderKey.value + 1
}
</script>

<template>
  <div>
    <h2>
      List of Todos
      <div class="tooltip">
        <IconInfo class="info-icon" />
        <span class="tooltiptext">
          Double click on the todos to edit them
        </span>
      </div>
    </h2>
    <TodoForm
      @create-todo="createTodo"
      @create-todo-focused="disableEditing"
    />
    <div :key="reRenderKey">
      <Todo
        v-show="!loading"
        v-for="todo in state.todos"
        :id="todo.id"
        :title="todo.title"
        :completed="todo.completed"
        :editing="todo.editing"
        @edit-todo="setEditing"
        @complete-todo="completeTodo"
        @delete-todo="deleteTodo"
        @update-todo="updateTodo"
        @cancel-edit="disableEditing"
      />
    </div>
    <h4 v-show="loading">Loading...</h4>
  </div>
</template>

<style scoped>
h2 {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.tooltip {
  position: relative;
  width: 5%;
  margin-left: 0.5rem;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 150px;
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 5px 10px;
  border-radius: 6px;

  position: absolute;
  z-index: 1;
  bottom: 85%;
  left: 50%;
  margin-left: -60px;

  opacity: 0;
  transition: opacity 0.3s;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}

.info-icon{
  width: 1.5rem;
}
</style>
