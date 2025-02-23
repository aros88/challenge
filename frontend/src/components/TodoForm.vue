<script setup>
import { ref } from 'vue';
const emit = defineEmits(["create-todo-focused", "create-todo"])

const todoTitle = ref("")

const emitCreateTodo = () => {
  emit('create-todo', todoTitle.value)
}
</script>

<template>
  <form class="form">
    <input
      @focusin="$emit('create-todo-focused')"
      v-model="todoTitle"
      type="text"
      placeholder="New todo..."
      required
    />
    <button @click="emitCreateTodo">Create</button>
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
    background-color: #98F5E1;
    border-radius: 0.25rem;
    cursor: pointer;
  }
</style>
