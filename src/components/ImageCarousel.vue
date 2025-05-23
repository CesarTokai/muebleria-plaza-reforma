<template>
  <div class="carousel-box">
    <div class="carousel-inner">
      <transition name="slide-fade" mode="out-in">
        <img
          :src="images[current]"
          :key="images[current]"
          class="carousel-img"
          :alt="'slide-'+current"
        />
      </transition>
      <button class="carousel-btn left" @click="prev">&#10094;</button>
      <button class="carousel-btn right" @click="next">&#10095;</button>
    </div>
    <div class="carousel-dots">
      <span
        v-for="(img, i) in images"
        :key="i"
        :class="{ active: i === current }"
        @click="goTo(i)"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const props = defineProps({ images: Array })

const current = ref(0)
const total = computed(() => props.images.length)

function next() {
  current.value = (current.value + 1) % total.value
}
function prev() {
  current.value = (current.value - 1 + total.value) % total.value
}
function goTo(i) {
  current.value = i
}

const images = ref([
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
  "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&w=800",
  "https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&w=800",
  "https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=compress&w=800",
]);
</script>

<style scoped>
.carousel-box {
  width: 100%;
  max-width: 700px;
  margin: 0 auto 2.5rem;
  background: #fff;
  border-radius: 22px;
  box-shadow: 0 8px 32px #86073417;
  position: relative;
  overflow: hidden;
  min-height: 280px;
}
.carousel-inner {
  position: relative;
  width: 100%;
  height: 330px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.carousel-img {
  width: 100%;
  height: 330px;
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 0 4px 16px #86073413;
  transition: box-shadow 0.3s;
}
.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(134, 7, 52, 0.8);
  border: none;
  color: #fff;
  font-size: 2.1rem;
  border-radius: 50%;
  width: 42px;
  height: 42px;
  cursor: pointer;
  transition: background 0.18s, box-shadow 0.18s;
  z-index: 2;
  box-shadow: 0 2px 8px #86073411;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.89;
}
.carousel-btn:hover {
  background: #a03b68;
  box-shadow: 0 3px 15px #86073425;
}
.carousel-btn.left { left: 18px; }
.carousel-btn.right { right: 18px; }
.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin: 0.5rem 0 1rem 0;
}
.carousel-dots span {
  width: 12px; height: 12px;
  border-radius: 50%;
  display: inline-block;
  background: #ccc;
  cursor: pointer;
  transition: background 0.18s, transform 0.2s;
}
.carousel-dots span.active {
  background: #860734;
  transform: scale(1.2);
  box-shadow: 0 2px 10px #86073420;
}

/* Animaciones */
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(.35,1.11,.58,1);
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(40px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-40px);
}
@media (max-width: 700px) {
  .carousel-box, .carousel-inner, .carousel-img { height: 210px !important; }
  .carousel-inner { min-height: 170px !important; }
  .carousel-img { border-radius: 14px; }
}
</style>
