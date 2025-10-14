<template>
  <header class="navbar">
    <div class="navbar__inner">
      <div class="navbar__brand-wrap">
        <a href="#" class="navbar__brand">
          <span class="navbar__logo">
            <!-- SVG logo -->
            <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_6_330)">
                <path clip-rule="evenodd" d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z" fill="#860734" fill-rule="evenodd"/>
              </g>
              <defs><clipPath id="clip0_6_330"><rect fill="white" height="48" width="48"></rect></clipPath></defs>
            </svg>
          </span>
          <span class="navbar__title">Mueblería Plaza Reforma S.A. de C.V.</span>
        </a>
      </div>

      <nav class="navbar__nav">
        <router-link
          v-for="item in nav"
          :key="item.label"
          :to="item.to"
          class="navbar__link"
          :class="{ active: isActive(item) }"
        >
          {{ item.label }}
        </router-link>
      </nav>

      <div class="navbar__actions">
        <form @submit.prevent="handleSearch" class="navbar__search">
          <span class="navbar__search-icon">
            <svg width="16" height="16" viewBox="0 0 256 256" fill="none"><path fill="#9EADB3" d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"/></svg>
          </span>
          <input
            type="search"
            class="navbar__search-input"
            placeholder="Busca productos..."
            aria-label="Buscar productos"
            v-model="searchQuery"
            @keyup.enter="handleSearch"
          />
          <button
            v-if="searchQuery"
            type="button"
            class="navbar__search-clear"
            @click="clearSearch"
            title="Limpiar búsqueda"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const searchQuery = ref('');

// Sincronizar el input con el query param de la URL
watch(() => route.query.buscar, (newSearch) => {
  if (newSearch) {
    searchQuery.value = newSearch;
  } else if (route.name !== 'ProductosList' && route.name !== 'Productos') {
    searchQuery.value = '';
  }
}, { immediate: true });

// Usamos rutas con nombre para categorías y producto listado
const nav = [
  { label: 'Inicio', to: '/' },
  { label: 'Sala de estar', to: { name: 'Productos', params: { categoria: 'salas' } } },
  { label: 'Dormitorio', to: { name: 'Productos', params: { categoria: 'recamaras' } } },
  { label: 'Comedor', to: { name: 'Productos', params: { categoria: 'comedores' } } },
  { label: 'Office', to: { name: 'Productos', params: { categoria: 'oficina' } } },
  { label: 'Productos', to: { name: 'ProductosList' } }
];

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
  // Si estamos en la página de productos, limpiar el query param
  if (route.name === 'ProductosList' || route.name === 'Productos') {
    router.push({ name: 'ProductosList' });
  }
}

function isActive(item) {
  if (!route || !route.path) return false;

  // Si `to` es un string, compáralo con route.path (exacto o prefijo para categorías)
  if (typeof item.to === 'string') {
    if (item.to === '/') return route.path === '/';
    return route.path === item.to || route.path.startsWith(item.to + '/');
  }

  // Si `to` es un objeto (ruta nombrada), compara por nombre y params
  if (typeof item.to === 'object' && item.to.name) {
    if (route.name !== item.to.name) return false;
    // si tiene params.categoria, comparar con el param actual
    if (item.to.params && item.to.params.categoria) {
      return String(route.params.categoria || '').toLowerCase() === String(item.to.params.categoria).toLowerCase();
    }
    return true;
  }

  return false;
}
</script>

<style scoped>
/* Variables */
:root {
  --nav-bg: #ffffff;
  --nav-shadow: 0 1px 0 rgba(27, 31, 35, 0.04), 0 2px 6px rgba(0, 0, 0, 0.08);
  --nav-text: #222c36;
  --nav-link: #586069;
  --nav-link-hover: #860734;
  --nav-primary: #860734;
}

/* Navbar Container */
.navbar {
  background: var(--nav-bg);
  box-shadow: var(--nav-shadow);
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.navbar__inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  height: 64px;
}

/* Brand / Logo */
.navbar__brand-wrap {
  flex-shrink: 0;
}

.navbar__brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  transition: opacity 0.2s;
}

.navbar__brand:hover {
  opacity: 0.8;
}

.navbar__logo {
  display: flex;
  align-items: center;
  justify-content: center;
}

.navbar__title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--nav-text);
  white-space: nowrap;
}

/* Navigation Links */
.navbar__nav {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex: 1;
}

.navbar__link {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  color: var(--nav-link);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.2s;
  white-space: nowrap;
}

.navbar__link:hover {
  background: rgba(134, 7, 52, 0.08);
  color: var(--nav-link-hover);
}

.navbar__link.active {
  background: rgba(134, 7, 52, 0.12);
  color: var(--nav-primary);
  font-weight: 600;
}

/* Actions (search, buttons, etc.) */
.navbar__actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
}

/* Search capsule */
.navbar__search {
  display: flex;
  align-items: center;
  background: #f3f9ff;
  border-radius: 999px;
  padding: 8px 12px;
  height: 40px;
  border: 1px solid rgba(14,165,233,0.12);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.6);
  position: relative;
  transition: all 0.3s ease;
}

.navbar__search:focus-within {
  border-color: #860734;
  box-shadow: 0 0 0 3px rgba(134, 7, 52, 0.1);
}

.navbar__search-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 6px;
  flex-shrink: 0;
}

.navbar__search-input {
  border: none;
  outline: none;
  background: transparent;
  font-size: 1rem;
  color: #222c36;
  width: 160px;
  font-family: inherit;
}

.navbar__search-input::placeholder {
  color: #b0bec5;
  font-weight: 400;
}

.navbar__search-clear {
  background: transparent;
  border: none;
  padding: 4px;
  margin-left: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;
  color: #9EADB3;
}

.navbar__search-clear:hover {
  background: rgba(134, 7, 52, 0.1);
  color: #860734;
}

/* Responsive */
@media (max-width: 1024px) {
  .navbar__inner {
    gap: 1rem;
    padding: 0 1rem;
  }

  .navbar__nav {
    gap: 0;
  }

  .navbar__link {
    padding: 0.5rem 0.75rem;
    font-size: 0.9rem;
  }

  .navbar__title {
    font-size: 0.9rem;
  }

  .navbar__search-input {
    width: 120px;
  }
}

@media (max-width: 768px) {
  .navbar__inner {
    height: auto;
    padding: 0.75rem 1rem;
    flex-wrap: wrap;
  }

  .navbar__brand-wrap {
    order: 1;
  }

  .navbar__actions {
    order: 2;
    margin-left: auto;
  }

  .navbar__nav {
    order: 3;
    width: 100%;
    overflow-x: auto;
    gap: 0.25rem;
    padding: 0.5rem 0;
    scrollbar-width: none;
  }

  .navbar__nav::-webkit-scrollbar {
    display: none;
  }

  .navbar__link {
    flex-shrink: 0;
  }

  .navbar__title {
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

@media (max-width: 480px) {
  .navbar__search-input {
    width: 100px;
    font-size: 0.9rem;
  }

  .navbar__title {
    font-size: 0.85rem;
  }
}
</style>
