<template>
  <section class="testimonials-section">
    <div class="container">
      <h3 class="testimonials-title">Testimonios</h3>
      <div class="testimonial-carousel">
        <button class="arrow left" @click="prev" aria-label="Anterior">
          <i class="bi bi-chevron-left"></i>
        </button>
        <div class="testimonial-list">
          <div
            v-for="(testimonial, idx) in visibleTestimonials"
            :key="testimonial.name + idx"
            class="testimonial-card"
          >
            <div class="testimonial-icon">
              <i class="bi bi-person-circle"></i>
            </div>
            <blockquote class="testimonial-text">
              <span class="quote-mark">“</span>
              {{ testimonial.text }}
              <span class="quote-mark">”</span>
            </blockquote>
            <div class="testimonial-author">{{ testimonial.name }}</div>
          </div>
        </div>
        <button class="arrow right" @click="next" aria-label="Siguiente">
          <i class="bi bi-chevron-right"></i>
        </button>
      </div>
      <div class="carousel-dots">
        <span
          v-for="(dot, idx) in totalPages"
          :key="idx"
          :class="{ active: idx === page }"
          @click="goTo(idx)"
        ></span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';

const testimonials = ref([
  {
    name: "Laura Gómez",
    text: "Excelente atención y muebles de calidad. Recomiendo mucho la tienda.",
  },
  {
    name: "Pedro Martínez",
    text: "Me encantó la variedad y el servicio postventa, ¡gracias!",
  },
  {
    name: "Alejandra Ruiz",
    text: "La mejor experiencia de compra que he tenido. Muy recomendados.",
  },
  {
    name: "José Pérez",
    text: "Entrega rápida y productos de gran calidad, ¡quedé fascinado!",
  },
  {
    name: "Carlos Ramírez",
    text: "Precios muy competitivos y atención amable.",
  },
  {
    name: "Marta Espinoza",
    text: "Me ayudaron a personalizar mi sala y quedó perfecta.",
  },
]);

const page = ref(0);
const windowWidth = ref(window.innerWidth);

// Responsive: 1 en móvil, 2 en tablet, 3 en desktop
const perPage = computed(() => {
  if (windowWidth.value < 600) return 1;
  if (windowWidth.value < 1024) return 2;
  return 3;
});
const totalPages = computed(() =>
  Math.ceil(testimonials.value.length / perPage.value)
);

const visibleTestimonials = computed(() => {
  const start = page.value * perPage.value;
  return testimonials.value.slice(start, start + perPage.value);
});

function goTo(idx) {
  page.value = idx;
}
function next() {
  page.value = (page.value + 1) % totalPages.value;
}
function prev() {
  page.value = (page.value - 1 + totalPages.value) % totalPages.value;
}

let interval = null;
function startAutoSlide() {
  interval = setInterval(next, 5000);
}
function stopAutoSlide() {
  if (interval) clearInterval(interval);
}

onMounted(() => {
  window.addEventListener('resize', handleResize);
  startAutoSlide();
});
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  stopAutoSlide();
});
function handleResize() {
  windowWidth.value = window.innerWidth;
  // Corrige el page si al cambiar el perPage, la página se queda fuera
  if (page.value > totalPages.value - 1) page.value = 0;
}
watch(perPage, () => {
  if (page.value > totalPages.value - 1) page.value = 0;
});
</script>

<style scoped>
.testimonials-section {
  background: linear-gradient(120deg, #faf6fa 60%, #f7e6ef 100%);
  border-radius: 2rem;
  margin-bottom: 2.7rem;
  box-shadow: 0 6px 30px #86073418;
  padding: 2.5rem 0 2.5rem 0;
}
.testimonials-title {
  color: #860734;
  font-weight: 800;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 1.8rem;
  letter-spacing: 1px;
}
.testimonial-carousel {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  position: relative;
}
.arrow {
  background: none;
  border: none;
  font-size: 2.4rem;
  color: #860734cc;
  cursor: pointer;
  padding: 0 0.6rem;
  transition: color 0.18s, transform 0.18s;
  outline: none;
}
.arrow:hover {
  color: #ffd700;
  transform: scale(1.19);
}
.testimonial-list {
  display: flex;
  gap: 2.1rem;
  width: 100%;
  justify-content: center;
}
.testimonial-card {
  background: #fff;
  border-radius: 1.2rem;
  box-shadow: 0 4px 22px #86073413;
  padding: 1.6rem 1.2rem 1.3rem 1.2rem;
  min-width: 220px;
  max-width: 350px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1.5px solid #fff4f8;
  transition: box-shadow 0.18s;
  text-align: center;
  position: relative;
}
.testimonial-icon {
  margin-bottom: 1.2rem;
  color: #ffd700;
  font-size: 2.5rem;
  background: linear-gradient(135deg,#fff, #ffe8fa 85%);
  border-radius: 50%;
  box-shadow: 0 2px 10px #ffd70017;
  width: 56px; height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.testimonial-text {
  font-size: 1.07rem;
  color: #573043;
  margin-bottom: 1rem;
  font-weight: 500;
  line-height: 1.7;
  position: relative;
}
.quote-mark {
  font-size: 2rem;
  color: #e94e77;
  opacity: 0.38;
  font-family: serif;
}
.testimonial-author {
  color: #860734;
  font-weight: bold;
  font-size: 1.02rem;
  letter-spacing: 0.5px;
  margin-top: 0.2rem;
}
.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 0.6rem;
  margin-top: 1.3rem;
}
.carousel-dots span {
  width: 13px; height: 13px;
  border-radius: 50%;
  background: #ccc;
  cursor: pointer;
  transition: background 0.18s, transform 0.2s;
  display: inline-block;
}
.carousel-dots span.active {
  background: #860734;
  transform: scale(1.21);
  box-shadow: 0 2px 10px #86073428;
}
@media (max-width: 1024px) {
  .testimonial-list { gap: 1.1rem; }
  .testimonial-card { min-width: 190px; max-width: 280px;}
}
@media (max-width: 600px) {
  .testimonials-section { padding: 1.4rem 0 1.4rem 0; border-radius: 1.2rem; }
  .testimonials-title { font-size: 1.18rem; }
  .testimonial-list { gap: 0.5rem; }
  .testimonial-card { min-width: 150px; max-width: 97vw; padding: 0.9rem 0.3rem;}
  .arrow { font-size: 2rem; }
}
</style>
