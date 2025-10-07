<template>
  <header class="header" :class="{ shadow: scrolled }">
    <div class="container">
      <router-link to="/" class="logo-link">
        <img src="/public/img/logo.png" alt="Mueblería Plaza Reforma" class="logo" />
        <span class="brand-name">Mueblería Plaza Reforma</span>
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
        <div class="nav-categories">
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
        </div>
      </nav>
    </div>
    <div v-if="isMenuOpen" class="nav-backdrop" @click="closeMenu"></div>
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
  background: rgba(255,255,255,0.18);
  backdrop-filter: blur(12px) saturate(160%);
  -webkit-backdrop-filter: blur(12px) saturate(160%);
  border-radius: 0 0 24px 24px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18);
  padding: 0.7rem 0;
  position: sticky;
  top: 0;
  z-index: 30;
  transition: box-shadow 0.18s, background 0.3s;
}
.header.shadow {
  box-shadow: 0 2px 22px rgba(134, 7, 52, 0.2);
  background: rgba(255,255,255,0.32);
}
.container {
  max-width: 1250px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  padding: 0 2rem;
}
.logo-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
}
.logo {
  height: 54px;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(0 3px 8px rgba(134, 7, 52, 0.13));
  border-radius: 12px;
  background: rgba(255,255,255,0.5);
  padding: 2px 6px;
}
.brand-name {
  font-size: 1.25rem;
  font-weight: bold;
  color: #860734;
  letter-spacing: 1px;
  text-shadow: 0 1px 4px rgba(255, 215, 0, 0.18);
}
.menu-toggle {
  display: none;
  background: rgba(255, 255, 255, 0.18);
  border: none;
  outline: none;
  cursor: pointer;
  flex-direction: column;
  gap: 5px;
  width: 44px;
  height: 44px;
  margin-left: auto;
  z-index: 201;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(134, 7, 52, 0.13);
  transition: background 0.18s;
}
.menu-toggle:hover {
  background: rgba(255, 215, 0, 0.18);
}
.menu-toggle span {
  display: block;
  height: 4px;
  width: 30px;
  margin: 3px 0;
  border-radius: 4px;
  background: #860734;
  transition: all 0.33s cubic-bezier(0.55, 0.06, 0.68, 0.19);
  box-shadow: 0 1px 4px rgba(134, 7, 52, 0.13);
}
.menu-toggle span.open:nth-child(1) {
  transform: rotate(45deg) translate(7px, 7px);
}
.menu-toggle span.open:nth-child(2) {
  opacity: 0;
}
.menu-toggle span.open:nth-child(3) {
  transform: rotate(-45deg) translate(8px, -8px);
}

.nav {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;
  transition: all 0.24s;
}
.nav-categories {
  display: flex;
  gap: 0.5rem;
}
.nav-link {
  color: #860734;
  font-weight: 600;
  letter-spacing: 0.4px;
  font-size: 1.1rem;
  text-decoration: none;
  position: relative;
  padding: 0.5rem 1.1rem;
  border-radius: 10px;
  background: rgba(255,255,255,0.13);
  transition: color 0.16s, background 0.16s;
  overflow: hidden;
}
.nav-link::after {
  content: '';
  display: block;
  height: 3px;
  border-radius: 2px;
  width: 0;
  background: linear-gradient(90deg,#ffd700,#860734);
  position: absolute;
  left: 20%;
  bottom: 2px;
  transition: width 0.23s;
}
.nav-link:hover,
.nav-link.active-link {
  color: #ffd700;
  background: rgba(134, 7, 52, 0.08);
}
.nav-link:hover::after,
.nav-link.active-link::after {
  width: 60%;
}

.nav-backdrop {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.18);
  z-index: 200;
  transition: background 0.3s;
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
@media (max-width: 700px) {
  .brand-name {
    font-size: 1rem;
  }
}
@media (max-width: 650px) {
  .menu-toggle {
    display: flex;
  }
  .nav {
    flex-direction: column;
    align-items: flex-start;
    background: rgba(255,255,255,0.95);
    backdrop-filter: blur(16px) saturate(180%);
    position: fixed;
    top: 0;
    right: 0;
    width: 85vw;
    height: 100vh;
    padding: 5.5rem 2rem 2rem 2rem;
    gap: 1.5rem;
    z-index: 202;
    transform: translateX(110%);
    box-shadow: -7px 0 20px rgba(134, 7, 52, 0.13);
    transition: transform 0.36s cubic-bezier(0.78, -0.02, 0.61, 0.97);
  }
  .nav.active {
    transform: translateX(0);
  }
  .nav-link {
    font-size: 1.1rem;
    width: 100%;
    border-radius: 12px;
    padding: 0.8rem 1rem;
    margin: 0.1rem 0;
  }
}
</style>
