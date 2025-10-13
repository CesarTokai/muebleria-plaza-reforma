<template>
  <div>
    <Navbar />
    <Header />
    <main class="products-page">
      <div class="container">
        <h1 class="main-title">Catálogo de Productos</h1>
        <p class="subtitle">Descubre nuestros muebles de calidad excepcional</p>

        <!-- Buscador y filtros mejorados -->
        <div class="filters-container">
          <div class="filters-row">
            <div class="search-wrapper">
              <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input
                type="text"
                class="search-input"
                placeholder="Buscar producto..."
                v-model="searchTerm"
              />
            </div>

            <div class="filter-group">
              <select v-model="selectedCategory" class="filter-select">
                <option value="">📁 Todas las categorías</option>
                <option v-for="cat in categories" :key="cat.value" :value="cat.value">
                  {{ cat.icon }} {{ cat.label }}
                </option>
              </select>

              <div class="price-filters">
                <input
                  type="number"
                  class="price-input"
                  placeholder="$ Mínimo"
                  v-model.number="minPrice"
                  min="0"
                />
                <span class="price-separator">-</span>
                <input
                  type="number"
                  class="price-input"
                  placeholder="$ Máximo"
                  v-model.number="maxPrice"
                  min="0"
                />
              </div>

              <button class="clear-filters-btn" @click="clearFilters" v-if="hasActiveFilters">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                Limpiar
              </button>
            </div>
          </div>

          <!-- Contador de resultados -->
          <div class="results-info" v-if="!loadingProducts">
            <span class="results-count">
              {{ filteredProducts.length }} producto{{ filteredProducts.length !== 1 ? 's' : '' }} encontrado{{ filteredProducts.length !== 1 ? 's' : '' }}
            </span>
            <span class="category-badge" v-if="selectedCategory">
              {{ categories.find(c => c.value === selectedCategory)?.label }}
            </span>
          </div>
        </div>

        <!-- Loading con mejor diseño -->
        <div v-if="loadingProducts" class="loading-container">
          <div class="spinner"></div>
          <p>Cargando productos...</p>
        </div>

        <!-- Grid de productos -->
        <div class="gallery-grid" v-else>
          <div
            v-for="product in paginatedProducts"
            :key="product.id"
            class="product-card"
          >
            <div class="product-badge" v-if="product.price < 5000">¡Oferta!</div>
            <div class="product-img-wrap">
              <img
                :src="product.img || '/assets/img/products/default.jpg'"
                :alt="product.name"
                class="product-img"
              />
            </div>
            <div class="product-info">
              <h4 class="product-name">{{ product.name }}</h4>
              <div class="product-category-tag">{{ getCategoryLabel(product.category) }}</div>
              <span class="product-price">${{ product.price.toLocaleString('es-MX') }}</span>
              <button class="product-btn" @click="goToProduct(product.id)">
                <span>Ver detalles</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>

          <div v-if="filteredProducts.length === 0" class="no-products">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M16 16s-1.5-2-4-2-4 2-4 2M9 9h.01M15 9h.01"/>
            </svg>
            <h3>No hay productos que coincidan</h3>
            <p>Intenta ajustar los filtros de búsqueda</p>
            <button class="clear-filters-btn" @click="clearFilters">Limpiar filtros</button>
          </div>
        </div>

        <!-- Paginación mejorada -->
        <div class="pagination" v-if="totalPages > 1 && !loadingProducts">
          <button
            class="page-btn nav-btn"
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>

          <button
            v-for="page in visiblePages"
            :key="page"
            :class="['page-btn', { active: page === currentPage }]"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>

          <button
            class="page-btn nav-btn"
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import '../components/assets/Styles.css';
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Navbar from '../components/Navbar.vue'
import { ref, computed, onMounted, watch } from 'vue'
import axiosConfig from '../config/AxiosConfig.js'
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();

function goToProduct(id) {
  router.push({ name: 'ProductoDetalle', params: { id } });
}

// Simula tus productos (después los traerás de la API)
const products = ref([])
const loadingProducts = ref(false)

async function fetchProducts() {
  loadingProducts.value = true
  try {
    const res = await axiosConfig.doGet('/furniture/')
    products.value = res.data.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      category: item.category,
      img: item.img_base64 || '/assets/img/products/default.jpg',
    }))
  } catch (e) {
    products.value = []
  } finally {
    loadingProducts.value = false
  }
}

onMounted(() => {
  fetchProducts();
  const categoria = ref(route.params.categoria);
  fetchProductosPorCategoria(categoria.value);
});

watch(() => route.params.categoria, (newCategoria) => {
  if (newCategoria) {
    fetchProductosPorCategoria(newCategoria);
  }
});

function fetchProductosPorCategoria(categoria) {
  if (categoria) {
    selectedCategory.value = categoria;
  }
}

const categories = [
  { value: 'salas', label: 'Salas', icon: '🛋️' },
  { value: 'recamaras', label: 'Recámaras', icon: '🛏️' },
  { value: 'comedores', label: 'Comedores', icon: '🍽️' },
  { value: 'oficina', label: 'Oficina', icon: '💼' },
  { value: 'bebes-ninos', label: 'Bebés y Niños', icon: '👶' },
  { value: 'exteriores', label: 'Exteriores', icon: '🌳' },
  { value: 'decoracion', label: 'Decoración', icon: '🎨' }
];

const selectedCategory = ref('');
const searchTerm = ref('');
const minPrice = ref('');
const maxPrice = ref('');

const currentPage = ref(1);
const itemsPerPage = 12;

const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchesCategory = !selectedCategory.value || 
      product.category?.trim().toLowerCase() === selectedCategory.value.trim().toLowerCase();
    const matchesSearch = !searchTerm.value ||
      product.name.toLowerCase().includes(searchTerm.value.toLowerCase());
    const matchesMinPrice = !minPrice.value || product.price >= minPrice.value;
    const matchesMaxPrice = !maxPrice.value || product.price <= maxPrice.value;
    return matchesCategory && matchesSearch && matchesMinPrice && matchesMaxPrice;
  });
});

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredProducts.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / itemsPerPage);
});

const visiblePages = computed(() => {
  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages.value, start + maxVisible - 1);

  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

const hasActiveFilters = computed(() => {
  return selectedCategory.value || searchTerm.value || minPrice.value || maxPrice.value;
});

function clearFilters() {
  selectedCategory.value = '';
  searchTerm.value = '';
  minPrice.value = '';
  maxPrice.value = '';
  currentPage.value = 1;
}

function getCategoryLabel(category) {
  const cat = categories.find(c => c.value?.toLowerCase() === category?.toLowerCase());
  return cat ? cat.label : 'General';
}

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}
</script>

<style scoped>
.products-page {
  padding: 3rem 0 4rem 0;
  background: linear-gradient(135deg, #faf6fa 0%, #f0e8f0 100%);
  min-height: 70vh;
}

.main-title {
  text-align: center;
  color: #860734;
  font-size: 2.8rem;
  margin-bottom: 0.5rem;
  font-weight: 900;
  letter-spacing: 1px;
  text-shadow: 2px 2px 4px rgba(134, 7, 52, 0.1);
}

.subtitle {
  text-align: center;
  color: #3a223a;
  font-size: 1.1rem;
  margin-bottom: 2.5rem;
  opacity: 0.85;
}

/* Filtros mejorados */
.filters-container {
  background: white;
  padding: 1.8rem;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(134, 7, 52, 0.08);
  margin-bottom: 2.5rem;
}

.filters-row {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.search-wrapper {
  position: relative;
  width: 100%;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: #860734;
  opacity: 0.6;
}

.search-input {
  width: 100%;
  padding: 0.85rem 1.2rem 0.85rem 3rem;
  border-radius: 12px;
  font-size: 1rem;
  border: 2px solid #e0d0e0;
  background: #fafafa;
  color: #3a223a;
  outline: none;
  transition: all 0.3s ease;
}

.search-input:focus {
  border-color: #860734;
  background: white;
  box-shadow: 0 0 0 4px rgba(134, 7, 52, 0.1);
}

.filter-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}

.filter-select {
  flex: 1;
  min-width: 200px;
  padding: 0.85rem 1.2rem;
  border-radius: 12px;
  font-size: 1rem;
  border: 2px solid #e0d0e0;
  background: #fafafa;
  color: #3a223a;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-select:focus {
  border-color: #860734;
  background: white;
  box-shadow: 0 0 0 4px rgba(134, 7, 52, 0.1);
}

.price-filters {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  min-width: 250px;
}

.price-input {
  flex: 1;
  padding: 0.85rem 1rem;
  border-radius: 12px;
  font-size: 1rem;
  border: 2px solid #e0d0e0;
  background: #fafafa;
  color: #3a223a;
  outline: none;
  transition: all 0.3s ease;
}

.price-input:focus {
  border-color: #860734;
  background: white;
  box-shadow: 0 0 0 4px rgba(134, 7, 52, 0.1);
}

.price-separator {
  color: #860734;
  font-weight: bold;
  font-size: 1.2rem;
}

.clear-filters-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1.5rem;
  background: #860734;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.clear-filters-btn svg {
  width: 18px;
  height: 18px;
}

.clear-filters-btn:hover {
  background: #a50e48;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(134, 7, 52, 0.3);
}

.results-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1.2rem;
  padding-top: 1.2rem;
  border-top: 2px solid #f0e8f0;
  flex-wrap: wrap;
}

.results-count {
  color: #3a223a;
  font-weight: 600;
  font-size: 1rem;
}

.category-badge {
  background: linear-gradient(135deg, #860734 0%, #a50e48 100%);
  color: white;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

/* Loading */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
  gap: 1rem;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f0e8f0;
  border-top: 4px solid #860734;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Grid de productos */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.product-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(134, 7, 52, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  padding: 1.2rem;
  position: relative;
  overflow: hidden;
}

.product-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #860734 0%, #ffd700 100%);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.product-card:hover::before {
  transform: scaleX(1);
}

.product-card:hover {
  box-shadow: 0 12px 40px rgba(134, 7, 52, 0.15);
  transform: translateY(-8px);
}

.product-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  color: #860734;
  padding: 0.4rem 0.9rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  z-index: 2;
  box-shadow: 0 2px 8px rgba(255, 215, 0, 0.4);
}

.product-img-wrap {
  width: 100%;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  overflow: hidden;
  border-radius: 16px;
  background: linear-gradient(135deg, #f4e8f4 0%, #e8d8e8 100%);
  position: relative;
}

.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.product-card:hover .product-img {
  transform: scale(1.1);
}

.product-info {
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.product-name {
  color: #860734;
  font-weight: 700;
  font-size: 1.15rem;
  line-height: 1.4;
  min-height: 2.8rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-category-tag {
  display: inline-block;
  align-self: center;
  background: #f0e8f0;
  color: #860734;
  padding: 0.25rem 0.8rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}

.product-price {
  color: #860734;
  font-weight: 900;
  font-size: 1.5rem;
  display: block;
}

.product-btn {
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  color: #860734;
  font-weight: 700;
  border-radius: 12px;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.product-btn svg {
  width: 18px;
  height: 18px;
  transition: transform 0.3s ease;
}

.product-btn:hover {
  background: linear-gradient(135deg, #ffed4e 0%, #ffd700 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 215, 0, 0.4);
}

.product-btn:hover svg {
  transform: translateX(4px);
}

.no-products {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 4rem 2rem;
  text-align: center;
}

.no-products svg {
  width: 80px;
  height: 80px;
  color: #860734;
  opacity: 0.3;
}

.no-products h3 {
  color: #860734;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
}

.no-products p {
  color: #3a223a;
  font-size: 1rem;
  opacity: 0.7;
  margin: 0;
}

/* Paginación mejorada */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 3rem;
  flex-wrap: wrap;
}

.page-btn {
  min-width: 44px;
  height: 44px;
  padding: 0.5rem 1rem;
  border: 2px solid #e0d0e0;
  background: white;
  color: #860734;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-btn svg {
  width: 20px;
  height: 20px;
}

.page-btn:hover:not(:disabled) {
  background: #f0e8f0;
  border-color: #860734;
  transform: translateY(-2px);
}

.page-btn.active {
  background: linear-gradient(135deg, #860734 0%, #a50e48 100%);
  color: white;
  border-color: #860734;
  box-shadow: 0 4px 12px rgba(134, 7, 52, 0.3);
}

.page-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.nav-btn {
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  border-color: #ffd700;
  color: #860734;
}

.nav-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #ffed4e 0%, #ffd700 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
}

/* Responsive */
@media (max-width: 768px) {
  .main-title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1rem;
    padding: 0 1rem;
  }

  .filters-container {
    padding: 1.2rem;
  }

  .filter-group {
    flex-direction: column;
    width: 100%;
  }

  .filter-select,
  .price-filters {
    width: 100%;
    min-width: unset;
  }

  .clear-filters-btn {
    width: 100%;
    justify-content: center;
  }

  .gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1.5rem;
  }

  .product-img-wrap {
    height: 180px;
  }

  .pagination {
    gap: 0.3rem;
  }

  .page-btn {
    min-width: 40px;
    height: 40px;
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .products-page {
    padding: 2rem 0;
  }

  .gallery-grid {
    grid-template-columns: 1fr;
  }
}
</style>
