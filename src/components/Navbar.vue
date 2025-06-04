<template>
  <header class="header" :class="{ shadow: scrolled }">
    <div class="container">
      <router-link to="/" class="logo-link">
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
        <router-link
          v-for="cat in categories"
          :key="cat.value"
          :to="`/productos/${cat.value}`"
          class="nav-link"
          @click="closeMenu"
          active-class="active-link"
        >
          {{ cat.label }}
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
  { name: "Todos los productos", to: "/productos" },
  { name: "Contacto", to: "/contacto" }
];

const categories = [
  { label: "Sala", value: "sala" },
  { label: "Oficina", value: "oficina" },
  { label: "Camas y colchones", value: "camas-y-colchones" },
  { label: "Comedor", value: "comedor" },
  { label: "Cocinas", value: "cocinas" },
  { label: "Electrodomésticos pequeños", value: "electrodomesticos-pequenos" },
  { label: "Bicicletas", value: "bicicletas" },
  { label: "Refrigeradores", value: "refrigeradores" },
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
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 30;
  transition: box-shadow 0.18s;
}
.header.shadow {
  box-shadow: 0 2px 22px rgba(134, 7, 52, 0.2);
}
.container {
  max-width: 1250px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between; /* Separar logo/nombre del menú */
  align-items: center;
  gap: 3rem; /* Incrementar espacio entre elementos */
  padding: 0 2rem;
}
.logo-link {
  display: flex;
  align-items: center;
  gap: 2rem; /* Incrementar espacio entre logo y nombre */
  text-decoration: none;
}
.logo {
  height: 90px;
  width: auto;
  object-fit: contain;
  transition: filter 0.2s;
  filter: drop-shadow(0 3px 8px rgba(134, 7, 52, 0.1));
}
.brand-name {
  font-size: 1.2rem;
  font-weight: bold;
  color: #ffd700;
  text-shadow: 0 1px 4px rgba(255, 215, 0, 0.5);
}
.menu-toggle {
  display: none;
  background: rgba(255, 255, 255, 0.13);
  border: none;
  outline: none;
  cursor: pointer;
  flex-direction: column;
  gap: 4px;
  width: 35px;
  height: 32px;
  margin-left: auto;
  z-index: 200;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(134, 7, 52, 0.2);
  transition: background 0.18s;
}
.menu-toggle:hover {
  background: rgba(255, 215, 0, 0.2);
}
.menu-toggle span {
  display: block;
  height: 3px;
  width: 27px;
  margin: 3px 0;
  border-radius: 4px;
  background: #fff;
  transition: all 0.33s cubic-bezier(0.55, 0.06, 0.68, 0.19);
  box-shadow: 0 1px 4px rgba(134, 7, 52, 0.2);
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
  gap: 2rem; /* Incrementar espacio entre enlaces del menú */
  align-items: center;
  justify-content: center;
  transition: all 0.24s;
}
.nav-link {
  color: #fff;
  font-weight: 600;
  letter-spacing: 0.4px;
  font-size: 1.1rem;
  text-decoration: none;
  position: relative;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: color 0.16s, background 0.16s;
}
.nav-link::after {
  content: '';
  display: block;
  height: 3px;
  border-radius: 2px;
  width: 0;
  background: #ffd700;
  position: absolute;
  left: 20%;
  bottom: 2px;
  transition: width 0.23s;
}
.nav-link:hover,
.nav-link.active-link {
  color: #ffd700;
  background: rgba(255, 255, 255, 0.1);
}
.nav-link:hover::after,
.nav-link.active-link::after {
  width: 60%;
}

@media (max-width: 950px) {
  .container {
    gap: 1rem;
    padding: 0 1rem;
  }
  .logo {
    height: 40px;
  }
  .nav {
    gap: 1rem;
  }
}
@media (max-width: 650px) {
  .menu-toggle {
    display: flex;
  }
  .nav {
    flex-direction: column;
    align-items: flex-start;
    background: #860734;
    position: fixed;
    top: 0;
    right: 0;
    width: 85vw;
    height: 100vh;
    padding: 4.5rem 2rem;
    gap: 1.5rem;
    z-index: 99;
    transform: translateX(110%);
    box-shadow: -7px 0 20px rgba(134, 7, 52, 0.2);
    transition: transform 0.36s cubic-bezier(0.78, -0.02, 0.61, 0.97);
  }
  .nav.active {
    transform: translateX(0);
  }
  .nav-link {
    font-size: 1rem;
    width: 100%;
    border-radius: 12px;
    padding: 0.8rem 1rem;
    margin: 0.1rem 0;
  }
}
</style>
