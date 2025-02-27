<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import { useStore } from 'vuex';
import TodoForm from './TodoForm.vue';
import TodoItem from './TodoItem.vue';
import IconInfo from './icons/IconInfo.vue';

const props = defineProps({
  getTodos: {
    type: Function,
    default() {
      return [];
    }
  },
  createTodo: {
    type: Function,
    default() {
      return [];
    }
  },
  updateTodo: {
    type: Function,
    default() {
      return [];
    }
  },
  deleteTodo: {
    type: Function,
    default() {
      return [];
    }
  }
});

const store = useStore();
const reRenderKey = ref(0);
const perPage = ref(+localStorage.getItem('perPage') || 5);
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

watch(perPage, async (newValue) => {
  localStorage.setItem('perPage', Math.min(+newValue, 100));
});

const fetchTodos = async (page = 1) => {
  store.dispatch('clearErrorMsg');
  loading.value = true;
  
  try {
    const response = await props.getTodos(page, perPage.value);

    state.todos = response.todos.map(t => {
      return {...t, editing: false};
    }) || [];
    state.pagination = response.pagination;
    reRenderKey.value += 1;

    loading.value = false;
  } catch {
    store.dispatch('setErrorMsg', 'Something wrong has occurred, please try again later.');
  } finally {
    loading.value = false;
  }
};

const createTodo = async (title) => {
  store.dispatch('clearErrorMsg');
  try {
    const todo = await props.createTodo(title);
    state.todos.push({
      ...todo,
      editing: false,
    });
    reRenderKey.value = reRenderKey.value + 1;
  } catch {
    store.dispatch('setErrorMsg', 'Something wrong has occurred, please try again later.');
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
  store.dispatch('clearErrorMsg');
  try {
    const response = await props.updateTodo(id, title, completed);

    if (response) {
      const todo = state.todos.find((t) => t.id === id);
      todo.title = title;
      todo.completed = completed;
      todo.editing = false;
      reRenderKey.value = reRenderKey.value + 1;
    }
  } catch {
    store.dispatch('setErrorMsg', 'Something wrong has occurred, please try again later.');
  }
};

const deleteTodo = async (id) => {
  store.dispatch('clearErrorMsg');
  try {
    const response = await props.deleteTodo(id);

    if (response) {
      state.todos = state.todos.filter((t) => t.id !== id);
      if (state.todos.length === 0 && state.pagination.page > 1) {
        await fetchTodos(state.pagination.page - 1);
      } else if (state.todos.length > 0) {
        await fetchTodos(state.pagination.page);
      }
      reRenderKey.value = reRenderKey.value + 1;
    }
  } catch {
    store.dispatch('setErrorMsg', 'Something wrong has occurred, please try again later.');
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
  <div class="todo-list">
    <div class="title">
      <h2>
        List of Todos
        <div class="tooltip">
          <IconInfo class="info-icon" />
          <span class="tooltiptext"> Double click on the todos to edit them </span>
        </div>
      </h2>
    </div>
    <div class="content">
      <TodoForm @create-todo="createTodo" @create-todo-focused="disableEditing" />
      <form class="per-page">
        <label for="perPage">Results per page (max. 100)</label>
        <div class="single-input-form">
          <input id="perPage" type="text" v-model="perPage">
          <button @click="fetchTodos">Apply</button>
        </div>
      </form>
      <div id="reRenderKey" :key="reRenderKey">
        <TodoItem
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
    </div>
    <div class="pagination" v-show="state.pagination.totalPages > 1">
      <h4>Pages</h4>
      <ul class="pages">
        <li
          id="prevPage"
          v-show="state.pagination.page > 1"
          @click="fetchTodos(state.pagination.page - 1)"
        >
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
          id="nextPage"
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
.per-page {
  margin-top: 1.5rem;
  max-width: 50%;

  .form-input button {
    background-color: var(--secondary-color);
  }
}

.todo-list {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.current-page {
  background-color: var(--confirm-color) !important;
}

.pages {
  display: flex;
  list-style-type: none;
}

.title {
  flex-grow: 1;
}

.content {
  flex-grow: 4;
}

.pagination {
  flex-grow: 1;
  justify-items: center;
}

.pages li {
  margin-right: 1rem;
  padding: 0.75rem;
  border-radius: 10%;
  background-color: var(--secondary-color);
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
  width: 10rem;
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;

  position: absolute;
  z-index: 1;
  bottom: 85%;
  left: 50%;
  margin-left: -5rem;

  opacity: 0;
  transition: opacity 0.3s;
  font-size: 1rem;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}

.info-icon {
  width: 1.5rem;
}
</style>
