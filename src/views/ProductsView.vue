<template>
  <div>
    <Navbar />
    <Header />
    <main class="products-page">
      <div class="container">
        <h1 class="main-title">Catálogo de Productos</h1>

        <!-- Buscador y filtros -->
        <div class="filters">
          <input
            type="text"
            class="search-input"
            placeholder="Buscar producto..."
            v-model="searchTerm"
          />
          <select v-model="selectedCategory">
            <option value="">Todas las categorías</option>
            <option v-for="cat in categories" :key="cat.value" :value="cat.value">
              {{ cat.label }}
            </option>
          </select>
          <input
            type="number"
            class="price-input"
            placeholder="Precio mínimo"
            v-model.number="minPrice"
            min="0"
          />
          <input
            type="number"
            class="price-input"
            placeholder="Precio máximo"
            v-model.number="maxPrice"
            min="0"
          />
        </div>

        <div class="gallery-grid">
          <div v-if="loadingProducts" class="no-products">Cargando productos...</div>
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="product-card"
            v-else
          >
            <div class="product-img-wrap">
              <img
                :src="product.img || '/assets/img/products/default.jpg'"
                :alt="product.name"
                class="product-img"
              />
            </div>
            <div class="product-info">
              <h4 class="product-name">{{ product.name }}</h4>
              <span class="product-price">${{ product.price.toLocaleString('es-MX') }}</span>
              <button class="product-btn" @click="goToProduct(product.id)">Ver detalles</button>
            </div>
          </div>
          <div v-if="!loadingProducts && filteredProducts.length === 0" class="no-products">
            No hay productos que coincidan con la búsqueda o los filtros.
          </div>
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
  { value: 'salas', label: 'Salas' },
  { value: 'recamaras', label: 'Recámaras' },
  // ...agrega más categorías si quieres
];

const selectedCategory = ref('');
const searchTerm = ref('');
const minPrice = ref('');
const maxPrice = ref('');

const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchesCategory = !selectedCategory.value || product.category === selectedCategory.value;
    const matchesSearch = !searchTerm.value ||
      product.name.toLowerCase().includes(searchTerm.value.toLowerCase());
    const matchesMinPrice = !minPrice.value || product.price >= minPrice.value;
    const matchesMaxPrice = !maxPrice.value || product.price <= maxPrice.value;
    return matchesCategory && matchesSearch && matchesMinPrice && matchesMaxPrice;
  });
});
</script>

<style scoped>
.products-page {
  padding: 3rem 0 2rem 0;
  background: #faf6fa;
  min-height: 70vh;
}

.main-title {
  text-align: center;
  color: #860734;
  font-size: 2.2rem;
  margin-bottom: 2.2rem;
  font-weight: 900;
  letter-spacing: 1px;
}

/* Filtros */
.filters {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2.2rem;
}
.filters input,
.filters select {
  padding: 0.62rem 1.2rem;
  border-radius: 7px;
  font-size: 1.07rem;
  border: 2px solid #860734;
  background: #fffdfa;
  color: #3a223a;
  box-shadow: 0 2px 8px #86073412;
  outline: none;
  min-width: 160px;
  transition: border-color 0.2s, box-shadow 0.15s;
}
.filters select:focus,
.filters input:focus {
  border-color: #e94e77;
  box-shadow: 0 0 0 2px #ffd70055;
}
.search-input {
  min-width: 200px;
}
.price-input {
  width: 130px;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 2rem;
}

.product-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 20px #8607340a;
  transition: box-shadow 0.19s, transform 0.17s;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.2rem 1.1rem 1.3rem 1.1rem;
  position: relative;
}

.product-card:hover {
  box-shadow: 0 6px 30px #86073422;
  transform: translateY(-6px) scale(1.03);
}

.product-img-wrap {
  width: 100%;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.1rem;
  overflow: hidden;
  border-radius: 10px;
  background: #f4e8f4;
}

.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.24s;
}

.product-card:hover .product-img {
  transform: scale(1.07) rotate(-1deg);
}

.product-info {
  width: 100%;
  text-align: center;
  margin-top: 0.2rem;
}

.product-name {
  color: #860734;
  font-weight: 700;
  font-size: 1.09rem;
  margin-bottom: 0.2rem;
}

.product-price {
  color: #3a223a;
  font-weight: 800;
  font-size: 1.12rem;
  display: block;
  margin-bottom: 0.85rem;
}

.product-btn {
  background: #ffd700;
  color: #860734;
  font-weight: 700;
  border-radius: 24px;
  border: none;
  padding: 0.57rem 1.8rem;
  font-size: 1rem;
  box-shadow: 0 2px 8px #ffd70025;
  cursor: pointer;
  transition: background 0.16s, color 0.13s, box-shadow 0.17s, transform 0.16s;
}

.product-btn:hover {
  background: #ffe066;
  color: #860734;
  transform: scale(1.08);
  box-shadow: 0 4px 18px #ffd70032;
}

.no-products {
  grid-column: 1 / -1;
  text-align: center;
  color: #860734;
  font-weight: bold;
  font-size: 1.2rem;
  opacity: 0.87;
  margin-top: 2rem;
}

/* Responsive */
@media (max-width: 700px) {
  .gallery-grid {
    grid-template-columns: 1fr;
  }
  .product-img-wrap { height: 150px; }
  .product-card { padding: 1.1rem 0.4rem; }
  .filters { flex-direction: column; gap: 0.6rem; }
  .search-input { min-width: 98vw; width: 98vw; }
}
</style>
