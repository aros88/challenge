<script setup>
import { ref } from 'vue';
import IconClose from './icons/IconClose.vue';
  
  const emit = defineEmits(["edit-todo", "update-todo", "complete-todo", "delete-todo"])

  const props = defineProps({
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

  const todoTitle = ref(props.title)

  const updatedTodo = () => {
    // console.log(todoTitle.value, props.title)
    emit('update-todo', props.id, todoTitle.value, props.completed)
  }

  const toggleTodo = () => {
    console.log(props.id, props.title, !props.completed)
    emit('update-todo', props.id, props.title, !props.completed)
  }
</script>

<template>
  <div class="todo">
    <input type="checkbox" :checked="completed" @input="toggleTodo"/>
    <input type="text" @dblclick="$emit('edit-todo', id)" :readonly="!editing" v-model="todoTitle"/>
    <button v-show="editing" @click="updatedTodo">Update</button>
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
