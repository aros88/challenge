<script setup>
import { ref } from 'vue';
import IconBin from './icons/IconBin.vue';
import IconCancel from './icons/IconCancel.vue';
import IconCheck from './icons/IconCheck.vue';
const emit = defineEmits(["edit-todo", "cancel-edit", "update-todo", "complete-todo", "delete-todo"])
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
  emit('update-todo', props.id, todoTitle.value, props.completed)
}

const toggleTodo = () => {
  emit('update-todo', props.id, props.title, !props.completed)
}

const cancelEdit = () => {
  emit('cancel-edit')
}
</script>

<template>
  <div class="todo-wrapper">
    <div class="todo">
      <input type="checkbox" :checked="completed" @input="toggleTodo"/>
      <input type="text" @dblclick="$emit('edit-todo', id)" :readonly="!editing" v-model="todoTitle" autofocus/>
      <IconCheck class="update-icon" v-show="editing" @click="updatedTodo"/>
      <IconCancel class="update-icon" v-show="editing" @click="cancelEdit"/>
    </div>
    <IconBin class="delete-icon" @click="$emit('delete-todo', id)"/>
  </div>
</template>

<style scoped>
  .todo-wrapper {
    display: flex;
    align-items: center;
  }

  .todo {
    display: flex;
    justify-content: flex-start;
    background-color: white;
    width: 40%;
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
    background-color: #D9D9D9;
  }

  .todo input:read-only {
    background-color: #D9D9D9;
  }

  .todo input[type="checkbox"] {
    width: 0.75rem;
    margin-left: 0.05rem;
    margin-right: 0.4rem;
  }

  .todo input[type="text"] {
    width: 80%;
    max-width: 720px;
    border-style: none;
  }

  .delete-icon {
    max-width: 40px;
    cursor: pointer;
    margin-top: 1rem;
    margin-left: 0.5rem;
  }

  .update-icon {
    max-width: 40px;
    cursor: pointer;
    margin-left: 0.5rem;
    /* margin-right: 0.25rem; */
  }
</style>
