<template>
  <div>
    <Navbar />
    <Header />
    <main class="products-page">
      <div class="container">
        <h1 class="main-title">Catálogo de Productos</h1>
        <div class="filters">
          <select v-model="selectedCategory">
            <option value="">Todas las categorías</option>
            <option v-for="cat in categories" :key="cat.value" :value="cat.value">
              {{ cat.label }}
            </option>
          </select>
        </div>
        <div class="gallery-grid">
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="product-card"
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
          <div v-if="filteredProducts.length === 0" class="no-products">
            No hay productos en esta categoría.
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
import { ref, computed } from 'vue'

import { useRouter } from 'vue-router';
const router = useRouter();

function goToProduct(id) {
  router.push({ name: 'ProductoDetalle', params: { id } });
}

// Simula tus productos (después los traerás de la API)
const products = [
  { id: 1, name: 'Sofá Esquinero', price: 12999, category: 'salas', img: '/assets/img/products/sofa.jpg' },
  { id: 2, name: 'Mesa de Centro', price: 5999, category: 'salas', img: '/assets/img/products/mesa.jpg' },
  { id: 3, name: 'Cama King Size', price: 15499, category: 'recamaras', img: '/assets/img/products/cama.jpg' },
]

const categories = [
  { value: 'salas', label: 'Salas' },
  { value: 'recamaras', label: 'Recámaras' },
  // Puedes agregar más aquí, solo agrega en tu arreglo y aparecerán.
]

const selectedCategory = ref('')

const filteredProducts = computed(() => {
  return selectedCategory.value
    ? products.filter(p => p.category === selectedCategory.value)
    : products
})
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
  margin-bottom: 1.5rem;
  font-weight: 900;
  letter-spacing: 1px;
}

.filters {
  display: flex;
  justify-content: center;
  margin-bottom: 2.5rem;
  gap: 1rem;
}

.filters select {
  padding: 0.7rem 1.5rem;
  border: 2px solid #860734;
  border-radius: 7px;
  font-size: 1.1rem;
  background: #fff;
  color: #333;
  box-shadow: 0 2px 8px #86073410;
  outline: none;
  transition: border-color 0.2s;
}

.filters select:focus {
  border-color: #e94e77;
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
}
</style>
