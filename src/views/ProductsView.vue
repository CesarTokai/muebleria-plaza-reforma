<template>
  <div>
    <Navbar />
    <Header />
    <main class="products-page">
      <div class="container">
        <h1 class="main-title">Catálogo de Productos</h1>
        <div class="filters">
          <select v-model="selectedCategory">
            <option value="">Todos</option>
            <option value="salas">Salas</option>
            <option value="recamaras">Recámaras</option>
          </select>
        </div>
        <ProductGallery :products="filteredProducts" />
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import ProductGallery from '../components/ProductGallery.vue'
import { ref, computed } from 'vue'
import Navbar from '../components/Navbar.vue';


const products = [
  { id: 1, name: 'Sofá Esquinero', price: 12999, category: 'salas', img: '/assets/img/products/sofa.jpg' },
  { id: 2, name: 'Mesa de Centro', price: 5999, category: 'salas', img: '/assets/img/products/mesa.jpg' },
  { id: 3, name: 'Cama King Size', price: 15499, category: 'recamaras', img: '/assets/img/products/cama.jpg' },
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
  padding: 3rem 0;
  background: #f7f7fa;
  min-height: 80vh;
}

.main-title {
  text-align: center;
  color: #860734;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  position: relative;
  letter-spacing: 1px;
}

.main-title::after {
  content: '';
  display: block;
  margin: 0.5rem auto 0;
  width: 90px;
  border-bottom: 4px solid #860734;
  border-radius: 2px;
  opacity: 0.6;
}

.filters {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  gap: 1rem;
}

.filters select {
  padding: 0.7rem 1.5rem;
  border: 2px solid #860734;
  border-radius: 7px;
  font-size: 1.1rem;
  background: #fff;
  color: #333;
  box-shadow: 0 2px 8px rgba(134, 7, 52, 0.07);
  outline: none;
  transition: border-color 0.2s;
}

.filters select:focus {
  border-color: #e94e77;
}

@media (max-width: 600px) {
  .products-page {
    padding: 1.5rem 0;
  }
  .main-title {
    font-size: 1.6rem;
  }
}
</style>
