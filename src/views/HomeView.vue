<template>
  <div>
    <Navbar />
    <Header />


    <ImageCarousel :images="carouselImages" />
    <AdvantagesSection />
    <MisionVision />

    <HeroBanner />
    <section class="featured-section">
      <div class="container">
        <h2 class="featured-title">Productos Destacados</h2>
        <ProductGallery :products="featuredProducts" />
      </div>
    </section>
    <InspirationGallery :images="galleryImages" />
    <CtaSection />
    <BenefitsSection />
    <MapSection />
    <Testimonials :testimonials="testimonialsList" />

    <Footer />
  </div>
</template>

<script setup>
import BenefitsSection from '@/components/BenefitsSection.vue';
import Header from '../components/Header.vue';
import MisionVision from '@/components/MisionVision.vue';
import HeroBanner from '../components/HeroBanner.vue';
import Footer from '../components/Footer.vue';
import ProductGallery from '../components/ProductGallery.vue';
import Navbar from '../components/Navbar.vue';
import AdvantagesSection from '../components/AdvantagesSection.vue';
import ImageCarousel from '../components/ImageCarousel.vue';
import InspirationGallery from '../components/InspirationGallery.vue';
import Testimonials from '../components/Testimonials.vue';
import CtaSection from '../components/CtaSection.vue';
import MapSection from '../components/MapSection.vue';




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



const featuredProducts = [
  { id: 1, name: 'Sofá Esquinero "Clásico"', price: 12999, img: '/assets/img/products/sofa.jpg' },
  { id: 2, name: 'Mesa de Centro Roble', price: 5999, img: '/assets/img/products/mesa.jpg' }
]
</script>

<style scoped></style>
