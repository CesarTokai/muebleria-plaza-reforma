<template>

  <header class="navbar">
    <!-- Barra principal de navegación -->
    <div class="navbar__main">
      <div class="navbar__inner">
        <div class="navbar__brand-wrap">
          <router-link to="/" class="navbar__brand">
            <span class="navbar__logo">
              <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_6_330)">
                  <path clip-rule="evenodd" d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z" fill="#860734" fill-rule="evenodd"/>
                </g>
                <defs><clipPath id="clip0_6_330"><rect fill="white" height="48" width="48"></rect></clipPath></defs>
              </svg>
            </span>
            <div class="brand-text">
              <span class="navbar__title">Mueblería Plaza Reforma</span>
              <span class="navbar__subtitle">Calidad y estilo para tu hogar</span>
            </div>
          </router-link>
        </div>

        <nav class="navbar__nav" :class="{ 'nav-open': mobileMenuOpen }">
          <button class="nav-close" @click="mobileMenuOpen = false" aria-label="Cerrar menú">
            <i class="bi bi-x-lg"></i>
          </button>
          <router-link
            v-for="item in nav"
            :key="item.label"
            :to="item.to"
            class="navbar__link"
            :class="{ active: isActive(item) }"
            @click="mobileMenuOpen = false"
          >
            <i v-if="item.icon" :class="item.icon"></i>
            {{ item.label }}
          </router-link>
        </nav>

        <div class="navbar__actions">
          <form @submit.prevent="handleSearch" class="navbar__search">
            <button type="submit" class="search-submit" aria-label="Buscar">
              <i class="bi bi-search"></i>
            </button>
            <input
              type="search"
              class="navbar__search-input"
              placeholder="Buscar productos..."
              aria-label="Buscar productos"
              v-model="searchQuery"
              @focus="searchFocused = true"
              @blur="searchFocused = false"
            />
            <button
              v-if="searchQuery"
              type="button"
              class="navbar__search-clear"
              @click="clearSearch"
              title="Limpiar búsqueda"
            >
              <i class="bi bi-x-circle-fill"></i>
            </button>
          </form>

          <button class="mobile-menu-toggle" @click="mobileMenuOpen = !mobileMenuOpen" aria-label="Abrir menú">
            <i class="bi bi-list"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Overlay para menú móvil -->
    <Transition name="overlay">
      <div v-if="mobileMenuOpen" class="nav-overlay" @click="mobileMenuOpen = false"></div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import * as categoriesService from '../services/categories';

const route = useRoute();
const router = useRouter();
const searchQuery = ref('');
const mobileMenuOpen = ref(false);
const searchFocused = ref(false);
const categories = ref([]);

// Cargar categorías dinámicamente para no hardcodear muchas rutas
async function fetchCategories() {
  try {
    const res = await categoriesService.getCategories();
    categories.value = res;
    buildNav();
  } catch (e) {
    console.error('Error cargando categorías en navbar', e);
  }
}

// Construir nav usando categorías + enlaces fijos
const nav = ref([]);
function buildNav() {
  const base = [
    { label: 'Inicio', to: '/', icon: 'bi bi-house-door-fill' },
    { label: 'Productos', to: { name: 'ProductosList' }, icon: 'bi bi-grid-3x3-gap-fill' }
  ];

  // Agregar hasta 6 categorías principales al nav (puedes ajustar la cantidad)
  const cats = categories.value.slice(0, 6).map(c => ({ label: c.name, to: { name: 'Productos', params: { categoria: c.name.toLowerCase().replace(/\s+/g, '-') } }, icon: 'bi bi-tags' }));

  const rest = [ { label: 'Categorías', to: '/productos', icon: 'bi bi-list' }, { label: 'Contacto', to: '/contacto', icon: 'bi bi-envelope-fill' } ];

  nav.value = [...base, ...cats, ...rest];
}

// Sincronizar el input con el query param de la URL
watch(() => route.query.buscar, (newSearch) => {
  if (newSearch) {
    searchQuery.value = newSearch;
  } else if (route.name !== 'ProductosList' && route.name !== 'Productos') {
    searchQuery.value = '';
  }
}, { immediate: true });

// Cerrar menú móvil al cambiar de ruta
watch(() => route.path, () => {
  mobileMenuOpen.value = false;
});

function handleSearch() {
  if (searchQuery.value.trim()) {
    router.push({
      name: 'ProductosList',
      query: { buscar: searchQuery.value.trim() }
    });
  }
}

function clearSearch() {
  searchQuery.value = '';
  if (route.name === 'ProductosList' || route.name === 'Productos') {
    router.push({ name: 'ProductosList' });
  }
}

function isActive(item) {
  if (!route || !route.path) return false;
  if (typeof item.to === 'string') {
    if (item.to === '/') return route.path === '/';
    return route.path === item.to || route.path.startsWith(item.to + '/');
  }
  if (typeof item.to === 'object' && item.to.name) {
    if (route.name !== item.to.name) return false;
    if (item.to.params && item.to.params.categoria) {
      return String(route.params.categoria || '').toLowerCase() === String(item.to.params.categoria).toLowerCase();
    }
    return true;
  }
  return false;
}

onMounted(fetchCategories);
</script>

<style scoped>
/* Variables mejoradas */
:root {
  --nav-primary: #860734;
  --nav-primary-dark: #6a0529;
  --nav-primary-light: #a91d4d;
  --nav-bg: #ffffff;
  --nav-text: #1f2937;
  --nav-text-light: #6b7280;
  --nav-border: #e5e7eb;
  --nav-hover: #f9fafb;
  --nav-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Main Navbar - Barra principal mejorada */
.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: var(--nav-shadow);
}

.navbar__main {
  background: var(--nav-bg);
  border-bottom: 1px solid var(--nav-border);
}

.navbar__inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  min-height: 72px;
}

.navbar__nav {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
}

/* Mobile adjustments */
.mobile-menu-toggle { display: none; }
.nav-overlay { display: none; }

@media (max-width: 900px) {
  .navbar__inner { padding: 0.75rem 1rem; }
  .navbar__search { min-width: 160px; }
  .mobile-menu-toggle { display: inline-flex; background: transparent; border: none; font-size: 1.1rem; }
  .navbar__nav { position: fixed; top: 72px; right: 0; bottom: 0; width: 260px; transform: translateX(100%); background: white; flex-direction: column; padding: 1rem; box-shadow: 0 10px 30px rgba(0,0,0,0.12); transition: transform 0.25s ease; z-index: 1200; }
  .navbar__nav.nav-open { transform: translateX(0); }
  .nav-close { display: block; align-self: flex-end; background: transparent; border: none; font-size: 1.25rem; margin-bottom: 0.5rem; }
  .nav-overlay { display: block; position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 1100; }
  .navbar__link { width: 100%; padding: 0.75rem; border-radius: 8px; }
}
</style>
