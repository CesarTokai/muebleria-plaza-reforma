<template>
  <section class="split-slider">
    <div class="split-left d-flex flex-column align-items-start justify-content-center px-">
      <h2 class="mb-3">Calidad y diseño <span>exclusivo</span></h2>
      <p class="mb-4">Descubre muebles hechos a mano que transforman tu espacio en un verdadero hogar.</p>
      <router-link to="/productos" class="btn-split-slider">Ver Catálogo</router-link>
    </div>
    <div
      class="split-right"
      @mousedown="startDrag"
      @mousemove="onDrag"
      @mouseup="endDrag"
      @mouseleave="endDrag"
      @touchstart="startDrag"
      @touchmove="onDrag"
      @touchend="endDrag"
    >
      <div class="slider-track" :style="{ transform: `translateX(-${current * 100}%)` }">
        <div
          v-for="(img, i) in images"
          :key="i"
          class="slider-img"
        >
          <img :src="img" class="img-fluid" />
        </div>
      </div>
      <div class="slider-dots">
        <span
          v-for="(img, i) in images"
          :key="i"
          :class="{ active: i === current }"
          @click="goTo(i)"
        ></span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const images = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
];

const current = ref(0);

function goTo(i) {
  current.value = i;
}

// --- Drag/Swipe logic (desktop + touch)
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
    if (diff < 0 && current.value < images.length - 1) {
      current.value++;
    } else if (diff > 0 && current.value > 0) {
      current.value--;
    }
    dragging = false; // solo un slide por drag
  }
}
function endDrag() {
  dragging = false;
}
</script>

<style scoped>
.split-slider {
  display: flex;
  width: 120%;
  min-height: 340px;
  max-width: 980px; 
  margin: 2.5rem auto 2.5rem auto;
  background: #fff;
  border-radius: 26px;
  box-shadow: 0 10px 38px #86073412;
  overflow: hidden;
}
.split-left {
  flex: 1 1 50%;
  background: linear-gradient(95deg, #860734 90%, #ffd70015 100%);
  color: #fff;
  min-height: 280px;
  padding: 2.2rem 1.8rem;
}
.split-left h2 {
  font-weight: 800;
  font-size: 2.1rem;
  line-height: 1.1;
  text-shadow: 0 2px 9px #86073445;
}
.split-left h2 span {
  color: #ffd700;
  font-style: italic;
  font-size: 1.1em;
}
.split-left p {
  font-size: 1.12rem;
  opacity: 0.97;
  margin-bottom: 2rem;
}
.btn-split-slider {
  background: linear-gradient(90deg,#ffd700 65%,#860734 120%);
  color: #860734 !important;
  padding: 0.7rem 2rem;
  border-radius: 26px;
  font-weight: 700;
  font-size: 1.04rem;
  box-shadow: 0 3px 14px #ffd70019;
  border: none;
  text-decoration: none;
  transition: background 0.18s, color 0.18s, box-shadow 0.18s, transform 0.15s;
}
.btn-split-slider:hover {
  background: linear-gradient(90deg,#ffe66b 50%,#a03b68 100%);
  color: #6a0530 !important;
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 7px 28px #ffd70029;
}

.split-right {
  flex: 1 1 50%;
  position: relative;
  background: #faf6fa;
  min-width: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: pan-y;
}
.slider-track {
  display: flex;
  transition: transform 0.45s cubic-bezier(.7,.04,.38,1.13);
  width: 100%;
  height: 100%;
}
.slider-img {
  min-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.slider-img img {
  width: 100%;
  height: 260px;
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 0 2px 14px #86073415;
  background: #fff;
}
.slider-dots {
  position: absolute;
  left: 0; right: 0;
  bottom: 19px;
  display: flex;
  justify-content: center;
  gap: 0.44rem;
}
.slider-dots span {
  width: 11px; height: 11px;
  border-radius: 50%;
  background: #ccc;
  display: inline-block;
  cursor: pointer;
  transition: background 0.16s, transform 0.18s;
}
.slider-dots span.active {
  background: #860734;
  transform: scale(1.18);
  box-shadow: 0 2px 10px #8607341b;
}

/* Responsive */
@media (max-width: 900px) {
  .split-slider { flex-direction: column; max-width: 97vw; min-height: 330px; }
  .split-left, .split-right { flex: 1 1 100%; min-height: 180px;}
  .split-left { padding: 1.1rem 1rem; text-align: center; align-items: center;}
  .slider-img img { height: 155px; }
}
</style>
