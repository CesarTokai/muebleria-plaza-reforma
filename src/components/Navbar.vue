<template>
  <header class="header">
    <div class="container">
      <router-link to="/" class="logo-link">
        <img src="/public/img/logo.png" alt="Mueblería Plaza Reforma" class="logo" />
      </router-link>
      <button class="menu-toggle" @click="toggleMenu">☰</button>
      <nav :class="['nav', { 'active': isMenuOpen }]">
        <router-link to="/">Inicio</router-link>
        <router-link to="/productos">Productos</router-link>
        <router-link to="/contacto">Contacto</router-link>
      </nav>

    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
const isMenuOpen = ref(false);
const toggleMenu = () => { isMenuOpen.value = !isMenuOpen.value };
</script>

<style scoped>
.header {
  background-color: #860734;
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 0;
}
.container {
  display: flex;
  justify-content: flex-start; /* Cambia de space-between a flex-start */
  align-items: center;
  gap: 2rem;  /* agrega separación entre logo y nav */
  padding-left: 1.5rem; /* Ajusta según tu preferencia */
  padding-right: 1.5rem;
}

.logo {
  height: 20px;
}
.nav {
  display: flex;
  gap: 2rem;
}
.nav a {
  color: white;
  font-weight: 600;
  text-decoration: none;
}
.menu-toggle {
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}
@media (max-width: 500px) {
  .menu-toggle {
    display: block;
  }
  .nav {
    position: fixed;
    top: 40px;
    left: 0;
    width: 90%;
    background-color: #860734;
    flex-direction: column;
    align-items: center;
    padding: 1rem ;
    clip-path: circle(0% at 100% 0);
    transition: clip-path 0.4s;
  }
  .nav.active {
    clip-path: circle(150% at 100% 0);
  }
}
</style>
