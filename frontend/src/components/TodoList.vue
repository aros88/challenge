<script setup>
import { onMounted, reactive, ref } from 'vue';
import TodoForm from './TodoForm.vue';
import Todo from './TodoItem.vue';
import IconInfo from './icons/IconInfo.vue';

const reRenderKey = ref(0);
const state = reactive({
  todos: [],
  pagination: {
    totalPages: 1,
    page: 1,
  },
});
const loading = ref(false);

onMounted(async () => {
  await fetchTodos();
});

const fetchTodos = async (page = 1) => {
  loading.value = true;

  try {
    const perPage = 5;
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/tasks?perPage=${perPage}&page=${page}`,
    );
    if (response.ok) {
      const data = await response.json();

      console.log(data);
      state.todos = data.tasks.map((todo) => {
        return {
          id: todo.id,
          title: todo.title,
          completed: todo.completed,
          editing: false,
        };
      });
      state.pagination = {
        totalPages: data.pagination.totalPages,
        page: data.pagination.page,
      };
      reRenderKey.value += 1;

      loading.value = false;
    } else {
      console.error('error fetching data');
    }
  } catch (err) {
    console.error('error fetching data', err);
  } finally {
    loading.value = false;
  }
};

const createTodo = async (title) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        completed: false,
      }),
    });

    if (response.ok) {
      const todo = response.json();
      state.todos.push({
        ...todo,
        editing: false,
      });
      reRenderKey.value = reRenderKey.value + 1;
    }
  } catch (err) {
    console.log(err);
  }
};

const setEditing = (id) => {
  const todo = state.todos.find((t) => t.id === id);

  todo.editing = true;
  state.todos.filter((t) => t.id !== id).forEach((t) => (t.editing = false));
  reRenderKey.value += 1;
};

const completeTodo = async (id) => {
  const todo = state.todos.find((t) => t.id === id);

  console.log(todo, id);
  await updateTodo(id, todo.title, !todo.completed);
};

const updateTodo = async (id, title, completed) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        title,
        completed,
      }),
    });

    if (response.ok) {
      const todo = state.todos.find((t) => t.id === id);
      todo.title = title;
      todo.completed = completed;
      todo.editing = false;
      reRenderKey.value = reRenderKey.value + 1;
    }
  } catch (err) {
    console.error(err);
  }
};

const deleteTodo = async (id) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      state.todos = state.todos.filter((t) => t.id !== id);
      if (state.todos.length === 0 && state.pagination.page > 1) {
        await fetchTodos(state.pagination.page - 1);
      }
      reRenderKey.value = reRenderKey.value + 1;
    }
  } catch (err) {
    console.error(err);
  }
};

const disableEditing = () => {
  state.todos = state.todos.map((t) => {
    return {
      ...t,
      editing: false,
    };
  });
  reRenderKey.value = reRenderKey.value + 1;
};
</script>

<template>
  <div>
    <h2>
      List of Todos
      <div class="tooltip">
        <IconInfo class="info-icon" />
        <span class="tooltiptext"> Double click on the todos to edit them </span>
      </div>
    </h2>
    <TodoForm @create-todo="createTodo" @create-todo-focused="disableEditing" />
    <div :key="reRenderKey">
      <Todo
        v-show="!loading"
        v-for="(todo, index) in state.todos"
        v-bind:key="index"
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
    <div class="pagination" v-show="state.pagination.totalPages > 1">
      <h4>Pages</h4>
      <ul class="pages">
        <li v-show="state.pagination.page > 1" @click="fetchTodos(state.pagination.page - 1)">
          Prev
        </li>
        <li
          v-for="page in state.pagination.totalPages"
          :key="page"
          v-bind:class="{ 'current-page': page === state.pagination.page }"
          @click="fetchTodos(page)"
        >
          {{ page }}
        </li>
        <li
          v-show="state.pagination.page < state.pagination.totalPages"
          @click="fetchTodos(state.pagination.page + 1)"
        >
          Next
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.current-page {
  background-color: #98f5e1 !important;
}

.pages {
  display: flex;
  list-style-type: none;
}

.pages li {
  margin-right: 1rem;
  padding: 0.75rem;
  border-radius: 10%;
  background-color: #d9d9d9;
  cursor: pointer;
}

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

.info-icon {
  width: 1.5rem;
}
</style>
