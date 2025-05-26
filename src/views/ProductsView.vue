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
import '../components/assets/Styles.css';

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
</style>
