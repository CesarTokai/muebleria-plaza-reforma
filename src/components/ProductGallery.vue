<template>
  <div class="product-gallery">
    <div v-for="product in products" :key="product.id" class="product-item">
      <ProductCard :product="product" />
    </div>
  </div>
</template>

<script setup>
// main.js o main.ts
import './assets/styles.css';

import ProductCard from './ProductCard.vue'
defineProps({ products: Array })
</script>

<style scoped>
.product-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 2rem;
}
.product-item:hover {
  transform: translateY(-10px) scale(1.025);
  z-index: 2;
}
</style>
