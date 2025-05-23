<template>
  <div class="product-detail">
    <Header />
    <div class="container">
      <div class="product-container">
        <!-- Galería de imágenes -->
        <div class="gallery">
          <div class="main-image">
            <img :src="currentImage" :alt="product.name">
          </div>
          <div class="thumbnails">
            <img 
              v-for="(img, index) in product.images" 
              :key="index" 
              :src="img" 
              @click="currentImage = img"
              :class="{ 'active': currentImage === img }"
            >
          </div>
        </div>

        <!-- Detalles del producto -->
        <div class="details">
          <h1>{{ product.name }}</h1>
          <p class="price">${{ product.price.toLocaleString('es-MX') }}</p>
          <p class="description">{{ product.description }}</p>
          
          <div class="features">
            <h3>Características:</h3>
            <ul>
              <li v-for="(feature, index) in product.features" :key="index">{{ feature }}</li>
            </ul>
          </div>

          <button class="cta-button" @click="addToCart">Añadir al carrito</button>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const currentImage = ref('');

const product = ref({
  id: route.params.id,
  name: 'Sofá Esquinero "Clásico"',
  price: 12999,
  description: 'Sofá de alta calidad fabricado en madera de roble con tapicería en piel sintética resistente.',
  images: [
    '/assets/img/products/sofa-1.jpg',
    '/assets/img/products/sofa-2.jpg',
    '/assets/img/products/sofa-3.jpg'
  ],
  features: [
    'Material: Madera de roble y piel sintética',
    'Dimensiones: 220cm x 160cm x 85cm',
    'Color: Café oscuro',
    'Garantía: 2 años'
  ]
});

onMounted(() => {
  currentImage.value = product.value.images[0];
});

const addToCart = () => {
  alert(`${product.value.name} añadido al carrito`);
  // Lógica para añadir al carrito (usar Pinia/Vuex en proyecto real)
};
</script>

<style scoped>
.product-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin: 3rem 0;
}

.gallery {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.main-image img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.thumbnails {
  display: flex;
  gap: 0.5rem;
}

.thumbnails img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.3s;
  border: 2px solid transparent;
}

.thumbnails img:hover, 
.thumbnails img.active {
  transform: scale(1.05);
  border-color: #860734;
}

.details h1 {
  font-size: 2.2rem;
  color: #333;
  margin-bottom: 1rem;
}

.price {
  font-size: 1.8rem;
  color: #860734;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.description {
  line-height: 1.6;
  margin-bottom: 2rem;
  color: #555;
}

.features {
  margin-bottom: 2rem;
}

.features ul {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-top: 0.5rem;
}

.features li {
  margin-bottom: 0.5rem;
  color: #555;
}

.cta-button {
  background-color: #860734;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}

.cta-button:hover {
  background-color: #6a0530;
}

@media (max-width: 768px) {
  .product-container {
    grid-template-columns: 1fr;
  }
}
</style>