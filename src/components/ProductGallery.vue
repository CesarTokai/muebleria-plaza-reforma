<template>
  <div class="product-gallery">
    <div 
      v-for="product in products" 
      :key="product.id" 
      class="product-item"
    >
      <ProductCard :product="product" />
    </div>
  </div>
</template>

<script setup>
import ProductCard from './ProductCard.vue'
const props = defineProps({ products: Array })
</script>

<style scoped>
.product-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 2rem;
}

.product-item {
  transition: transform 0.25s, box-shadow 0.25s;
}

.product-item:hover {
  transform: translateY(-10px) scale(1.025);
  box-shadow: 0 10px 32px rgba(134, 7, 52, 0.16);
  z-index: 2;
}
</style>
