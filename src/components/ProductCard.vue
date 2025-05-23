<template>
  <div class="product-card">
    <img :src="product.img" :alt="product.name" class="product-image" />
    <div class="product-info">
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="price">${{ product.price.toLocaleString('es-MX') }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({ product: Object })
</script>

<style scoped>
.product-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(134, 7, 52, 0.08);
  overflow: hidden;
  transition: box-shadow 0.25s, transform 0.22s;
  cursor: pointer;
  border: 1px solid #eee;
  display: flex;
  flex-direction: column;
}

.product-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  background: #faf6fa;
  border-bottom: 1px solid #f1e0ea;
  transition: filter 0.3s;
}

.product-card:hover .product-image {
  filter: brightness(0.94) saturate(1.12);
}

.product-info {
  padding: 1rem 0.8rem 1.5rem 0.8rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-name {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 0.4rem;
  font-weight: 600;
}

.price {
  color: #860734;
  font-weight: bold;
  font-size: 1.17rem;
  margin-top: 0.2rem;
}
</style>
