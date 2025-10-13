<script setup>
import { ref, onMounted, onUnmounted } from "vue"
import { Swiper, SwiperSlide } from "swiper/vue"
import { Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"

import img1 from "./img/inspiracion1.jpg"
import img2 from "./img/inspiracion2.jpg"
import img3 from "./img/inspiracion2.jpg"

const galleryImages = [img1, img2, img3]

// Detectar mobile
const isMobile = ref(false)
const handleResize = () => { isMobile.value = window.innerWidth < 800 }
onMounted(() => {
  handleResize()
  window.addEventListener("resize", handleResize)
  window.addEventListener("keydown", onKey) // ESC para cerrar modal
  window.addEventListener("touchend", resetPinch) // mover aquí
})
onUnmounted(() => {
  window.removeEventListener("resize", handleResize)
  window.removeEventListener("keydown", onKey)
  window.removeEventListener("touchend", resetPinch)
})

// Modal
const showModal = ref(false)
const modalImg = ref("")
const modalImgRef = ref(null)
const scale = ref(1)
let lastDist = 0

function openModal(img){ modalImg.value = img; showModal.value = true; scale.value = 1 }
function closeModal(){
  showModal.value = false; modalImg.value = ""; lastDist = 0
  if(modalImgRef.value) modalImgRef.value.style.transform = ""
}
function onKey(e){ if(e.key === "Escape" && showModal.value) closeModal() }

// Zoom: rueda y pinch
function zoom(e){
  e.preventDefault()
  const step = 0.1
  scale.value += e.deltaY < 0 ? step : -step
  scale.value = Math.max(1, Math.min(3, scale.value))
  if(modalImgRef.value) modalImgRef.value.style.transform = `scale(${scale.value})`
}
function onPinch(e){
  if(!(e.touches && e.touches.length === 2)) { lastDist = 0; return }
  const dx = e.touches[0].clientX - e.touches[1].clientX
  const dy = e.touches[0].clientY - e.touches[1].clientY
  const dist = Math.hypot(dx, dy)
  if(lastDist){
    scale.value += (dist - lastDist) / 200
    scale.value = Math.max(1, Math.min(3, scale.value))
    if(modalImgRef.value) modalImgRef.value.style.transform = `scale(${scale.value})`
  }
  lastDist = dist
}
function resetPinch(){ lastDist = 0 }
</script>

<template>
  <section class="gallery-section">
    <div class="container">
      <h3 class="gallery-title"><i class="fas fa-images"></i> Encuentra lo mejor para tu hogar</h3>

      <div v-if="!isMobile" class="gallery-grid">
        <div class="gallery-item" v-for="(img, i) in galleryImages" :key="i">
          <img :src="img" :alt="`Ambiente ${i+1}`" @click="openModal(img)" />
        </div>
      </div>

      <Swiper
          v-else
          class="gallery-swiper"
          :slides-per-view="1"
          :space-between="14"
          :pagination="{ clickable: true }"
          :modules="[Pagination]"
      >
        <SwiperSlide v-for="(img, i) in galleryImages" :key="i">
          <div class="gallery-item">
            <img :src="img" :alt="`Ambiente ${i+1}`" @click="openModal(img)" />
          </div>
        </SwiperSlide>
      </Swiper>

      <!-- Modal -->
      <div
          v-if="showModal"
          class="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="Vista ampliada de la imagen"
          @click="closeModal"
      >
        <div class="modal-img-content" @click.stop>
          <img
              :src="modalImg"
              alt=""
              class="modal-img"
              ref="modalImgRef"
              @wheel.prevent="zoom"
              @touchmove="onPinch"
          />
          <button class="close-btn" @click="closeModal" aria-label="Cerrar">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.gallery-section{ padding: 3rem 0; }
.gallery-title{ text-align:center; margin:0 0 1rem; }
.gallery-grid{
  display:grid; gap:1rem;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
}
.gallery-item img{
  width:100%; aspect-ratio:4/3; object-fit:cover; border-radius:14px;
  box-shadow: 0 6px 20px rgba(0,0,0,.08); cursor: zoom-in; display:block;
}

/* Swiper (mobile) */
.gallery-swiper{ width: 100%; margin: 0 auto; }

/* Modal */
.modal-backdrop{
  position:fixed; inset:0; z-index:9999; background: rgba(30,6,30,.75);
  display:flex; align-items:center; justify-content:center;
}
.modal-img-content{
  position:relative; max-width:92vw; max-height:88vh; background:#fff; border-radius:18px;
  box-shadow:0 4px 38px #8607346e; display:flex; align-items:center; justify-content:center; padding:.8em; overflow:hidden;
}
.modal-img{ max-width:86vw; max-height:74vh; border-radius:13px; transition: transform .23s; object-fit:contain; }
.close-btn{
  position:absolute; top:8px; right:8px; width:34px; height:34px;
  display:flex; align-items:center; justify-content:center;
  border:none; background:transparent; color:#a81552; font-size:1.4rem; cursor:pointer;
}
.close-btn:hover{ color:#860734; }
</style>
