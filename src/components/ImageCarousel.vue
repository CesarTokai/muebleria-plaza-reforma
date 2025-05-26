<template>
  <section class="split-slider">
    <div class="split-left d-flex flex-column align-items-start justify-content-center px-">
      <h2 class="mb-3">El mejor regalo de mama encuentralo en nuestra sucursal <span></span></h2>
      <p class="mb-4">Descubre muebles hechos a mano que transforman tu espacio en un verdadero hogar.</p>
      <router-link to="/productos" class="btn-split-slider">Descubre mas</router-link>
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
import './assets/styles.css'; 
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

</style>
