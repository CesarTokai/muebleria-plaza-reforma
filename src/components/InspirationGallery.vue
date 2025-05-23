<template>
  <section class="gallery-section py-5">
    <div class="container">
      <h3 class="mb-4 text-center gallery-title">Ambientes que inspiran</h3>
      <div class="gallery-grid">
        <div
          class="gallery-item"
          v-for="(img, i) in images"
          :key="i"
        >
          <img :src="img" class="gallery-img" :alt="'Inspiración '+(i+1)" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({ images: Array })
</script>

<style scoped>
.gallery-section {
  background: linear-gradient(135deg, #faf6fa 70%, #f7e6ef 100%);
  border-radius: 22px;
  box-shadow: 0 6px 30px #8607340c;
  margin-bottom: 2rem;
  position: relative;
}

.gallery-title {
  color: #860734;
  font-weight: 800;
  font-size: 2.1rem;
  letter-spacing: 1.1px;
  text-shadow: 0 2px 8px #86073418;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  gap: 1.7rem;
  padding: 0.7rem 0 0.2rem 0;
}

.gallery-item {
  overflow: hidden;
  border-radius: 18px;
  box-shadow: 0 4px 20px #86073413;
  background: #fff;
  transition: box-shadow 0.2s;
  position: relative;
  min-height: 190px;
  aspect-ratio: 4/3;
  animation: galleryFadeIn 0.9s cubic-bezier(.68,-0.55,.27,1.55) backwards;
}

.gallery-item:hover {
  box-shadow: 0 8px 32px #86073429;
  z-index: 2;
}

.gallery-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 18px;
  transition: transform 0.34s cubic-bezier(.38,.65,.36,1.17), filter 0.28s;
  filter: brightness(0.97) saturate(1.12);
}

.gallery-item:hover .gallery-img {
  transform: scale(1.06) rotate(-1deg);
  filter: brightness(1.05) saturate(1.22);
}

/* Fade in animación para cada item */
@keyframes galleryFadeIn {
  from {
    opacity: 0;
    transform: translateY(60px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@media (max-width: 600px) {
  .gallery-section {
    border-radius: 13px;
  }
  .gallery-item {
    border-radius: 10px;
    min-height: 100px;
    aspect-ratio: 4/3;
  }
  .gallery-title {
    font-size: 1.4rem;
  }
}
</style>
