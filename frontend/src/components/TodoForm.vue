<script setup>
defineEmits(["create-todo-focused"])
</script>

<template>
  <form class="form">
    <input @focusin="$emit('create-todo-focused')" type="text" placeholder="New todo..." required />
    <button>Create</button>
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
