<template>
  <header class="header" :class="{ shadow: scrolled }">
    <div class="container">
      <router-link to="/" class="logo-link">
        <img src="/img/logo.png" alt="Mueblería Plaza Reforma" class="logo" />
      </router-link>
      <button class="menu-toggle" @click="toggleMenu" :aria-expanded="isMenuOpen" aria-label="Menú">
        <span :class="{ open: isMenuOpen }"></span>
        <span :class="{ open: isMenuOpen }"></span>
        <span :class="{ open: isMenuOpen }"></span>
      </button>
      <nav :class="['nav', { 'active': isMenuOpen }]">
        <router-link
          v-for="item in navItems"
          :key="item.name"
          :to="item.to"
          class="nav-link"
          @click="closeMenu"
          active-class="active-link"
        >
          {{ item.name }}
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isMenuOpen = ref(false);
const scrolled = ref(false);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}
function closeMenu() {
  isMenuOpen.value = false;
}

const navItems = [
  { name: "Inicio", to: "/" },
  { name: "Electrodomésticos", to: "/productos" },
  { name: "Camas", to: "/camas" },
  { name: "Salas", to: "/salas" },
  { name: "Comedores", to: "/comedores" },
  { name: "Oficina", to: "/oficina" },
  { name: "Cocinas", to: "/cocinas" },
  { name: "Bebés y niños", to: "/bebes-ninos" },
  { name: "Contacto", to: "/contacto" }
];

function handleScroll() {
  scrolled.value = window.scrollY > 8;
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.header {
  background-color: #860734;
  padding: 0.9rem 0;
  position: sticky;
  top: 0;
  z-index: 30;
  transition: box-shadow 0.18s;
}
.header.shadow {
  box-shadow: 0 2px 22px #8607342c;
}
.container {
  max-width: 1250px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;
  padding-left: 2rem;
  padding-right: 2rem;
}
.logo-link {
  display: flex;
  align-items: center;
  margin-right: 2.5rem;
}
.logo {
  height: 38px;
  width: auto;
  object-fit: contain;
  transition: filter 0.2s;
  filter: drop-shadow(0 3px 8px #86073418);
}
.menu-toggle {
  display: none;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  flex-direction: column;
  gap: 4px;
  width: 35px;
  height: 32px;
  margin-left: auto;
  z-index: 100;
  justify-content: center;
  align-items: center;
}
.menu-toggle span {
  display: block;
  height: 3.2px;
  width: 27px;
  margin: 3px 0;
  border-radius: 4px;
  background: #fff;
  transition: all 0.33s cubic-bezier(.55,.06,.68,.19);
}
.menu-toggle span.open:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}
.menu-toggle span.open:nth-child(2) {
  opacity: 0;
}
.menu-toggle span.open:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -7px);
}

.nav {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  margin-left: auto;
  transition: all 0.24s;
}
.nav-link {
  color: #fff;
  font-weight: 600;
  letter-spacing: 0.4px;
  font-size: 1.11rem;
  text-decoration: none;
  position: relative;
  padding: 0.2rem 0.7rem;
  border-radius: 8px;
  transition: color 0.16s, background 0.16s;
}
.nav-link::after {
  content: '';
  display: block;
  height: 2.5px;
  border-radius: 2px;
  width: 0%;
  background: #ffd700;
  position: absolute;
  left: 20%;
  bottom: 2px;
  transition: width 0.23s;
}
.nav-link:hover,
.nav-link.active-link {
  color: #ffd700;
  background: #fff1;
}
.nav-link:hover::after,
.nav-link.active-link::after {
  width: 60%;
}

@media (max-width: 950px) {
  .container { gap: 0.8rem; padding-left: 1rem; padding-right: 1rem; }
  .logo-link { margin-right: 1rem;}
  .nav { gap: 0.85rem; }
}
@media (max-width: 700px) {
  .container { padding-left: 0.5rem; padding-right: 0.5rem; }
  .logo { height: 29px; }
  .nav-link { font-size: 0.96rem; }
}
@media (max-width: 650px) {
  .menu-toggle { display: flex; }
  .nav {
    flex-direction: column;
    align-items: flex-start;
    background: #860734;
    position: fixed;
    top: 0;
    right: 0;
    width: 85vw;
    height: 100vh;
    padding: 4.5rem 2.3rem 1.5rem 2.3rem;
    gap: 1.25rem;
    z-index: 99;
    transform: translateX(110%);
    box-shadow: -7px 0 20px #86073433;
    transition: transform 0.36s cubic-bezier(.78,-0.02,.61,.97);
  }
  .nav.active {
    transform: translateX(0%);
  }
  .nav-link {
    font-size: 1.11rem;
    width: 100%;
    border-radius: 12px;
    padding: 0.8rem 1rem;
    margin: 0.1rem 0;
  }
}
</style>
