<template>
  <section class="testimonials-section">
    <div class="container">
      <h3 class="testimonials-title">Testimonios</h3>
      <div class="carousel-wide-wrap">
        <div
          class="carousel-track"
          :style="trackStyle"
          @mousedown="startDrag"
          @mousemove="onDrag"
          @mouseup="endDrag"
          @mouseleave="endDrag"
          @touchstart="startDrag"
          @touchmove="onDrag"
          @touchend="endDrag"
        >
          <div
            v-for="testimonial in testimonials"
            :key="testimonial.text"
            class="testimonial-card-wide"
          
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
        <div class="carousel-dots">
          <span
            v-for="(_, idx) in pageCount"
            :key="idx"
            :class="{ active: idx === currentPage }"
            @click="goTo(idx)"
          ></span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import "./assets/styles.css";
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
// Bootstrap Icons en tu proyecto: <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">

const props = defineProps({
  testimonials: {
    type: Array,
    default: () => [
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
    ],
  },
});

const windowWidth = ref(window.innerWidth);
const testimonialsPerPage = computed(() => 1);
const pageCount = computed(() =>
  Math.ceil(props.testimonials.length / testimonialsPerPage.value)
);
const currentPage = ref(0);

const trackStyle = computed(() => ({
  transform: `translateX(-${currentPage.value * 100}%)`,
  width: `${pageCount.value * 100}%`,
}));

function goTo(idx) {
  currentPage.value = idx;
}

// Auto-slide
let interval = null;
onMounted(() => {
  interval = setInterval(() => {
    currentPage.value = (currentPage.value + 1) % pageCount.value;
  }, 4000);
  window.addEventListener("resize", handleResize);
});
onBeforeUnmount(() => {
  clearInterval(interval);
  window.removeEventListener("resize", handleResize);
});
function handleResize() {
  windowWidth.value = window.innerWidth;
  // Si el resize deja la página fuera de rango, la regresa
  if (currentPage.value > pageCount.value - 1) currentPage.value = 0;
}

// Arrastrar con mouse/touch
let startX = 0;
let dragging = false;

function startDrag(e) {
  dragging = true;
  startX = e.touches ? e.touches[0].clientX : e.clientX;
}
function onDrag(e) {
  if (!dragging) return;
  let x = e.touches ? e.touches[0].clientX : e.clientX;
  let diff = x - startX;
  if (Math.abs(diff) > 60) {
    if (diff < 0 && currentPage.value < pageCount.value - 1) {
      currentPage.value++;
    } else if (diff > 0 && currentPage.value > 0) {
      currentPage.value--;
    }
    dragging = false;
  }
}
function endDrag() {
  dragging = false;
}
</script>
