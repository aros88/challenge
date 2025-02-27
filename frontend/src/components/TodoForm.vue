<script setup>
import { reactive, ref } from 'vue';
const emit = defineEmits(['create-todo-focused', 'create-todo']);

const todoTitle = ref('');
const errorState = reactive({
  error: false,
  msg: null,
});

const onSubmit = (evt) => {
  const result = emitCreateTodo();
  if (!result) {
    evt.preventDefault();
  }
};

const emitCreateTodo = () => {
  if (todoTitle.value === null || todoTitle.value === undefined) return;
  if (todoTitle.value.trim() === '') {

    errorState.error = true;
    errorState.msg = 'Title cannot be blank';

    return false;
  }

  emit('create-todo', todoTitle.value);

  return true;
};
</script>

<template>
  <form class="form" v-on:submit="onSubmit">
    <div class="single-input-form">
      <input
        @focusin="$emit('create-todo-focused')"
        v-model="todoTitle"
        type="text"
        placeholder="New todo..."
        required
        autofocus
      />
      <button type="submit">Create</button>
    </div>
    <p v-show="errorState.error" class="error-msg">
      {{ errorState.msg }}
    </p>
  </form>
</template>

<style scoped>
.form {
  width: 100%;
}

.error-msg {
  color: #d23737;
  font-weight: bold;
}
</style>
