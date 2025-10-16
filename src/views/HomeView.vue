<template>
  <div>
    <Navbar />
    <div v-scroll-animate>
      <Header />
    </div>
    <div v-scroll-animate>
      <ImageCarousel :images="carouselImages" />
    </div>
    <div v-scroll-animate>
      <Gallery :images="galleryImages" />
    </div>
    <div v-scroll-animate>
      <AdvantagesSection />
    </div>
    <div v-scroll-animate>
      <MisionVision />
    </div>

    <section class="featured-section" v-scroll-animate>
      <div class="container">
        <h2 class="featured-title">Productos Destacados</h2>
        <div v-if="loadingFeatured">Cargando productos...</div>
        <ProductGallery v-else :products="featuredProducts" />
      </div>
    </section>
    <div v-scroll-animate>
      <InspirationGallery :images="galleryImages" />
    </div>
    <div v-scroll-animate>
      <CtaSection />
    </div>
    <div v-scroll-animate>
      <BenefitsSection />
    </div>
    <div v-scroll-animate>
      <MapSection />
    </div>
    <div v-scroll-animate>
      <Testimonials :testimonials="testimonialsList" />
    </div>
    <div v-scroll-animate>
      <Footer />
    </div>
    <!-- Botón flotante de WhatsApp -->
    <a
      href="https://wa.me/521XXXXXXXXXX?text=¡Hola!%20Quiero%20más%20información%20sobre%20sus%20muebles."
      class="whatsapp-float"
      target="_blank"
      rel="noopener"
      aria-label="Chatea por WhatsApp"
    >
      <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/whatsapp.svg" alt="WhatsApp" />
    </a>
  </div>
</template>

<script setup>
import BenefitsSection from '@/components/BenefitsSection.vue';
import Header from '../components/Header.vue';
import MisionVision from '@/components/MisionVision.vue';
import Footer from '../components/Footer.vue';
import ProductGallery from '../components/ProductGallery.vue';
import Navbar from '../components/Navbar.vue';
import AdvantagesSection from '../components/AdvantagesSection.vue';
import ImageCarousel from '../components/ImageCarousel.vue';
import InspirationGallery from '../components/InspirationGallery.vue';
import Testimonials from '../components/Testimonials.vue';
import CtaSection from '../components/CtaSection.vue';
import MapSection from '../components/MapSection.vue';
import { ref, onMounted } from 'vue';
import axiosConfig from '../config/AxiosConfig.js';
import Gallery from "@/components/assets/Gallery.vue";



// Ejemplo de datos para los props
const carouselImages = [
  '/assets/img/banner1.jpg',
  '/assets/img/banner2.jpg',
  '/assets/img/banner3.jpg'
]



const galleryImages = [
  '/assets/img/inspiracion1.jpg',
  '/assets/img/inspiracion2.jpg',
  '/assets/img/inspiracion3.jpg'
]

const testimonialsList = [
  {
    name: 'Laura Gómez',
    text: 'Excelente atención y muebles de calidad. Recomiendo mucho la tienda.',
    img: '/assets/img/testimonios/laura.jpg'
  },
  {
    name: 'Pedro Martínez',
    text: 'Me encantó la variedad y el servicio postventa, ¡gracias!',
    img: '/assets/img/testimonios/pedro.jpg'
  }
]

const featuredProducts = ref([]);
const loadingFeatured = ref(false);

async function fetchFeaturedProducts() {
  loadingFeatured.value = true;
  try {
    const res = await axiosConfig.doGet('/furniture/');
    // Puedes filtrar aquí si quieres solo algunos destacados, por ahora muestra los primeros 6
    featuredProducts.value = res.data.slice(0, 6).map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      img: item.img_base64 || '/assets/img/products/default.jpg',
      // Puedes agregar más campos si ProductGallery los usa
    }));
  } catch (e) {
    featuredProducts.value = [];
  } finally {
    loadingFeatured.value = false;
  }
}

onMounted(fetchFeaturedProducts);
</script>

<style scoped>

.whatsapp-float {
  position: fixed;
  bottom: 24px;
  right: 22px;
  z-index: 9999;
  background: #25D366;
  border-radius: 50%;
  box-shadow: 0 4px 18px #25d36653;
  width: 61px;
  height: 61px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.17s, box-shadow 0.16s;
  animation: waPop 0.7s;
}
.whatsapp-float img {
  width: 37px;
  height: 37px;
  filter: brightness(1.13) drop-shadow(0 2px 8px #25d36655);
}
.whatsapp-float:hover {
  transform: scale(1.08) translateY(-3px);
  box-shadow: 0 7px 25px #25d36685;
}
@media (max-width: 700px) {
  .whatsapp-float {
    width: 52px;
    height: 52px;
    bottom: 18px;
    right: 12px;
  }
  .whatsapp-float img {
    width: 29px;
    height: 29px;
  }
}

/* Responsive mejorado */
@media (max-width: 768px) {
  .featured-section {
    padding: 2rem 0;
  }

  .featured-title {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
  }

  .whatsapp-float {
    width: 54px;
    height: 54px;
    bottom: 16px;
    right: 14px;
  }

  .whatsapp-float img {
    width: 32px;
    height: 32px;
  }
}

@media (max-width: 480px) {
  .featured-section {
    padding: 1.5rem 0;
  }

  .featured-title {
    font-size: 1.5rem;
    margin-bottom: 1.25rem;
  }

  .container {
    padding: 0 0.75rem;
  }

  .whatsapp-float {
    width: 50px;
    height: 50px;
    bottom: 14px;
    right: 12px;
  }

  .whatsapp-float img {
    width: 28px;
    height: 28px;
  }
}
@keyframes waPop {
  0% { transform: scale(0.5) translateY(40px); opacity: 0;}
  100% { transform: scale(1) translateY(0); opacity: 1;}
}
</style>
