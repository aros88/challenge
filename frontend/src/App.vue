<script setup>
import { useStore } from 'vuex';
import HeaderComponent from './components/HeaderComponent.vue';
import IconClose from './components/icons/IconClose.vue';

const store = useStore();

const clearErrorMsg = () => {
  store.dispatch('clearErrorMsg');
};
</script>

<template>
  <div class="container">
    <div style="grid-area: hd;">
      <HeaderComponent />
    </div>
    <div style="grid-area: ct;">
      <div v-if="store.getters.isError" class="error-banner">
        <p>{{ store.getters.getErrorMsg }}</p>
        <IconClose @click="clearErrorMsg" class="close-icon" />
      </div>
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.error-banner {
  padding: 0.5rem;
  padding-left: 1rem;
  background-color: var(--error-color);
  border-radius: var(--input-border-radius);
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .close-icon {
    max-height: 1rem;
    cursor: pointer;
  }
}
</style>
