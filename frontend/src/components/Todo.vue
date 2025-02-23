<script setup>
import IconClose from './icons/IconClose.vue';
  
  const emit = defineEmits(["edit-todo", "complete-todo", "delete-todo"])

  defineProps({
    id: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    completed: {
      type: Boolean,
      required: true
    },
    editing: {
      type: Boolean,
      required: true
    }
  })
</script>

<template>
  <div class="todo">
    <input type="checkbox" v-bind:checked="completed" :value="completed" @input="$emit('complete-todo', id)"/>
    <input type="text" @dblclick="$emit('edit-todo', id)" :readonly="!editing" :value="title"/>
    <button v-show="editing">Update</button>
    <IconClose @click="$emit('delete-todo', id)"/>
  </div>
</template>

<style scoped>
  .todo {
    display: flex;
    justify-content: flex-start;
    background-color: white;
    width: 50%;
    border-radius: 0.25rem;
    margin-top: 1rem;
    padding: 0.25rem;
    border-color: black;
    border-width: 0.15rem;
    border-style: solid;
  }

  .todo input {
    border-radius: 0.25rem;
    padding: 0.5rem;
  }

  .todo:read-only {
    background-color: lightgray;
  }

  .todo input:read-only {
    background-color: lightgray;
  }

  .todo input[type="checkbox"] {
    width: 0.75rem;
    margin-left: 0.05rem;
  }

  .todo input[type="text"] {
    width: 80%;
    max-width: 720px;
    border-style: none;
  }
</style>
