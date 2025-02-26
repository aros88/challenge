<script setup>
import { reactive, ref } from 'vue';
const emit = defineEmits(['create-todo-focused', 'create-todo']);

const todoTitle = ref('');
const errorState = reactive({
  error: false,
  msg: null,
});

const emitCreateTodo = () => {
  if (todoTitle.value === null || todoTitle.value === undefined) return;
  if (todoTitle.value.trim() === '') {
    errorState.error = true;
    errorState.msg = 'Title cannot be blank';

    return;
  }

  emit('create-todo', todoTitle.value);
};
</script>

<template>
  <form class="form">
    <input
      @focusin="$emit('create-todo-focused')"
      v-model="todoTitle"
      type="text"
      placeholder="New todo..."
      required
      autofocus
    />
    <button @click="emitCreateTodo">Create</button>
    <p v-show="errorState.error" class="error-msg">
      {{ errorState.msg }}
    </p>
  </form>
</template>

<style scoped>
.form input {
  border-radius: 0.25rem;
  padding: 0.5rem;
  width: 40%;
  max-width: 720px;
}

.form button {
  padding: 0.5rem;
  background-color: #98f5e1;
  border-radius: 0.25rem;
  cursor: pointer;
}

.error-msg {
  color: #d23737;
  font-weight: bold;
}
</style>
