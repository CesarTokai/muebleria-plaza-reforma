<template>
  <div>
    <Navbar />
    <Header />
    <main class="products-page">
      <div class="container">
        <h1 class="main-title">Camas</h1>

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
import Navbar from '@/components/Navbar.vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function goToProduct(id) {
  router.push({ name: 'ProductoDetalle', params: { id } })
}

// Simula los productos (reemplaza luego con API)
const products = [
  { id: 1, name: 'Cama King Size', price: 15499, category: 'camas', img: '/assets/img/products/cama.jpg' },
  { id: 2, name: 'Buro Moderno', price: 1899, category: 'camas', img: '/assets/img/products/buro.jpg' },
  { id: 3, name: 'Sofá Esquinero', price: 12999, category: 'salas', img: '/assets/img/products/sofa.jpg' },
  // ...
]

// Aquí filtro solo la categoría camas (hardcodeada)
const filteredProducts = computed(() => products.filter(p => p.category === 'camas'))
</script>

<style scoped>
/* Reutiliza tus estilos */
</style>
