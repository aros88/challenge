<script setup>
import { ref } from "vue";
import IconClose from "./icons/IconClose.vue";
import IconHamburger from './icons/IconHamburger.vue';

const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
</script>

<template>
  <header>
    <nav>
      <div class="mobile-menu">
        <div class="menu-button">
          <IconHamburger style="max-width: 50px;" @click="toggleMobileMenu"/>
        </div>
        <div v-show="mobileMenuOpen" class="mobile-menu-list">
          <div class="close-menu-button">
            <IconClose style="cursor: pointer; max-width: 40px;" @click="toggleMobileMenu" />
          </div>
          <ul>
            <li><RouterLink to="/">Home</RouterLink></li>
            <li><RouterLink to="/about">About</RouterLink></li>
          </ul>
        </div>
      </div>
      <div class="title">
        MyTodos!
      </div>
      <ul>
        <li><RouterLink to="/">Home</RouterLink></li>
        <li><RouterLink to="/about">About</RouterLink></li>
      </ul>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  background-color: #A3C4F3;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
}

nav {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

nav ul {
  display: flex;
  list-style-type: none;
  margin: 0.5rem;
}

nav ul li {
  padding: 1rem;
  margin-left: 0.5rem;
  background-color: #A3C4F3;
  border-radius: 0.5rem;
  font-size: 1.25rem;
  color: white;
}

nav ul li:hover {
  cursor: pointer;
  background-color: #90DBF4;
}

nav ul li a {
  color: inherit;
  text-decoration: inherit;
}

.title {
  font-size: 2rem;
  margin-top: 1rem;
  margin-left: 1rem;
  color: white;
}

.mobile-menu {
  display: none;
}

@media (max-width: 1024px) {
  nav ul {
    display: none
  }

  .title {
    text-align: center;
    width: 100%;
    margin-bottom: 1rem;
  }

  .mobile-menu {
    display: block;
    margin: 0.5rem;
  }

  .menu-button {
    cursor: pointer;
  }

  .mobile-menu-list {
    width: 50%;
    height: 100%;
    background-color: #A3C4F3;
    z-index: 1;
    position: fixed;
    top: 0;
    left: 0;
  }

  .mobile-menu-list ul {
    display: block;
    list-style-type: none;
    margin: 0.5rem;
  }

  .mobile-menu-list ul li {
    width: 50%;
  }

  .close-menu-button {
    display: flex;
    justify-content: flex-end;
    margin: 1rem;
  }
}
</style>
