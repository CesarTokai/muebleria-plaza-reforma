<template>
  <div class="product-detail">
    <Navbar />
    <Header />

    <main class="detail-page">
      <div class="container">
        <div v-if="loading" class="no-products">Cargando producto...</div>
        <div v-else-if="error" class="no-products">{{ error }}</div>
        <div v-else class="product-container">
          <!-- Galería de imágenes -->
          <section class="gallery">
            <div class="main-image-wrap">
              <img
                :src="currentImage"
                :alt="product.name"
                class="main-image"
                @mousemove="onZoom"
                @mouseleave="resetZoom"
                ref="zoomImg"
              />
            </div>
            <div class="thumbs-wrap">
              <button class="thumb-arrow left" @click="scrollThumbs(-1)">‹</button>
              <div class="thumbnails" ref="thumbs">
                <img
                  v-for="(img, i) in product.images"
                  :key="i"
                  :src="img"
                  :class="{ active: currentImage === img }"
                  @click="currentImage = img"
                />
              </div>
              <button class="thumb-arrow right" @click="scrollThumbs(1)">›</button>
            </div>
          </section>

          <!-- Detalles del producto -->
          <aside class="details">
            <h1 class="title">{{ product.name }}</h1>
            <div class="price-stock">
              <p class="price">${{ product.price.toLocaleString('es-MX') }}</p>
              <p class="stock" :class="{ 'out': !product.inStock }">
                {{ product.inStock ? 'En stock' : 'Agotado' }}
              </p>
            </div>

            <div class="trust-badges">
              <span><i class="fas fa-truck"></i> Entrega rápida y segura</span>
              <span><i class="fas fa-shield-alt"></i> Apartado sin anticipo</span>
            </div>

            <p class="description">{{ product.description }}</p>

            <div class="features" v-if="product.features.length">
              <h3>Características:</h3>
              <ul>
                <li v-for="(f, idx) in product.features" :key="idx">{{ f }}</li>
              </ul>
            </div>

            <!-- Botón de Apartar -->
            <button
              class="cta-button"
              :disabled="!product.inStock"
              @click="reserveProduct"
            >
              <i class="fab fa-whatsapp"></i>
              {{ product.inStock ? 'Apartar por WhatsApp' : 'No disponible' }}
            </button>
            <div v-if="product.inStock" class="apartado-info">
              <i class="fas fa-lock"></i>
              Aparta tu producto sin compromiso. Un asesor te contactará para confirmar tu pedido.
            </div>
          </aside>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import axiosConfig from '../config/AxiosConfig.js';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

const route = useRoute();
const product = ref({
  id: route.params.id,
  name: '',
  price: 0,
  inStock: true,
  description: '',
  images: [],
  features: []
});
const currentImage = ref('');
const thumbs = ref(null);
const zoomImg = ref(null);
const loading = ref(true);
const error = ref('');

async function fetchProduct() {
  loading.value = true;
  try {
    const res = await axiosConfig.doGet(`/furniture/${route.params.id}`);
    const item = res.data;
    product.value = {
      id: item.id,
      name: item.name,
      price: item.price,
      inStock: item.stock > 0,
      description: item.description,
      images: item.img_base64 ? [item.img_base64] : ['/assets/img/products/default.jpg'],
      features: [
        item.brand ? `Marca: ${item.brand}` : null,
        item.color ? `Color: ${item.color}` : null,
        item.material ? `Material: ${item.material}` : null,
        item.dimensions ? `Dimensiones: ${item.dimensions}` : null,
        item.category ? `Categoría: ${item.category}` : null,
        `Stock: ${item.stock}`
      ].filter(Boolean)
    };
    currentImage.value = product.value.images[0];
  } catch (e) {
    error.value = 'No se pudo cargar el producto.';
  } finally {
    loading.value = false;
  }
}

onMounted(fetchProduct);

// Scroll de miniaturas
function scrollThumbs(direction) {
  const el = thumbs.value;
  el.scrollBy({ left: direction * 100, behavior: 'smooth' });
}

// Zoom ligero
function onZoom(e) {
  const img = zoomImg.value;
  const rect = img.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  img.style.transformOrigin = `${x}% ${y}%`;
  img.style.transform = 'scale(1.8)';
}
function resetZoom() {
  const img = zoomImg.value;
  img.style.transformOrigin = 'center center';
  img.style.transform = 'scale(1)';
}

// Apartar producto
function reserveProduct() {
  // WhatsApp directo o cambia el número y mensaje como gustes
  const phone = '523411223344'; // <--- Tu número, con código país y sin espacios
  const msg = `Hola, quiero apartar el producto: ${product.value.name} (ID: ${product.value.id})`;
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
}
</script>

<style scoped>
.detail-page {
  background: #faf6fa;
  padding: 2.5rem 0 4rem;
}
.product-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: flex-start;
}
@media (max-width: 900px) {
  .product-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

/* Galería */
.gallery {
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
}
.main-image-wrap {
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 4px 16px #86073416;
  background: #fff;
}
.main-image {
  width: 100%;
  height: 480px;
  object-fit: cover;
  border-radius: 12px;
  transition: transform 0.24s;
  cursor: zoom-in;
}
@media (max-width: 700px) {
  .main-image { height: 300px; }
}
.thumbs-wrap {
  position: relative;
  display: flex;
  align-items: center;
}
.thumbnails {
  display: flex;
  gap: 0.6rem;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding-bottom: 3px;
}
.thumbnails img {
  width: 72px;
  height: 72px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.21s, transform 0.21s;
}
.thumbnails img.active,
.thumbnails img:hover {
  border-color: #860734;
  transform: scale(1.07);
}
.thumb-arrow {
  background: #fafafa;
  border: 1px solid #eee;
  font-size: 1.4rem;
  color: #860734;
  cursor: pointer;
  padding: 0.4rem 0.9rem;
  border-radius: 4px;
  transition: background 0.18s, color 0.18s;
  box-shadow: 0 2px 8px #86073407;
}
.thumb-arrow.left { margin-right: 0.6rem; }
.thumb-arrow.right { margin-left: 0.6rem; }
.thumb-arrow:hover {
  background: #ffd70055;
  color: #6a0530;
}

/* Detalles */
.details {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 20px #86073412;
  padding: 2.2rem 2rem 2.4rem 2rem;
  display: flex;
  flex-direction: column;
  min-width: 280px;
  max-width: 500px;
  margin: 0 auto;
  position: relative;
}
.title {
  font-size: 2.2rem;
  color: #860734;
  margin-bottom: 1.3rem;
  font-weight: 900;
}
.price-stock {
  display: flex;
  align-items: baseline;
  gap: 1.4rem;
  margin-bottom: 1.2rem;
}
.price {
  font-size: 1.75rem;
  color: #ffd700;
  font-weight: 900;
  text-shadow: 0 2px 12px #86073412;
}
.stock {
  font-size: 1rem;
  color: #388e3c;
  font-weight: 700;
  letter-spacing: 0.2px;
}
.stock.out { color: #d32f2f; }

.trust-badges {
  display: flex;
  gap: 1.4rem;
  margin-bottom: 1.4rem;
  flex-wrap: wrap;
  font-size: 1.07rem;
  color: #860734;
}
.trust-badges i {
  color: #ffd700;
  margin-right: 0.32em;
}

.description {
  color: #555;
  line-height: 1.5;
  margin-bottom: 1.2rem;
  font-size: 1.1rem;
}

.features h3 {
  margin-bottom: 0.7rem;
  color: #860734;
  font-size: 1.17rem;
  font-weight: 800;
}
.features ul {
  list-style: disc;
  padding-left: 1.4rem;
  margin-bottom: 1.3rem;
}
.features li {
  margin-bottom: 0.4rem;
  color: #555;
  font-size: 1.04rem;
}

.cta-button {
  margin-top: auto;
  background: #25D366;
  color: #fff;
  font-weight: 800;
  border: none;
  padding: 1rem 2rem;
  border-radius: 30px;
  font-size: 1.19rem;
  box-shadow: 0 4px 20px #25d36634;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5em;
  justify-content: center;
}
.cta-button:disabled {
  background: #ccc;
  color: #fff;
  cursor: not-allowed;
}
.cta-button:hover:not(:disabled) {
  background: #128C7E;
  transform: translateY(-2px) scale(1.04);
}
.apartado-info {
  margin-top: 1.1rem;
  color: #860734;
  font-size: 1.06rem;
  display: flex;
  align-items: center;
  gap: 0.45em;
  font-weight: 600;
}
.apartado-info i {
  color: #ffd700;
  font-size: 1.2em;
}
</style>
