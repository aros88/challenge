<script setup>
import { createTodo, deleteTodo, getTodos, updateTodo } from '@/api/todos';
import TodoList from '@/components/TodoList.vue';
</script>

<template>
  <TodoList
    :getTodos="getTodos"
    :createTodo="createTodo"
    :updateTodo="updateTodo"
    :deleteTodo="deleteTodo"
  />
</template>
