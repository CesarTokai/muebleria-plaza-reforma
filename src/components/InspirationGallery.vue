<template>
  <section class="gallery-section py-5">
    <div class="container">
      <h3 class="mb-4 text-center gallery-title">Ambientes que inspiran</h3>
      <div class="gallery-grid">
        <div class="gallery-item" v-for="(img, i) in images" :key="i">
          <img
            v-for="(img, i) in galleryImages"
            :src="img"
            :key="i"
            style="width: 180px"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import "./assets/styles.css";
defineProps({ images: Array });

import img1 from "./assets/img/inspiracion1.jpg";
import img2 from "./assets/img/inspiracion2.jpg";
import img3 from "./assets/img/inspiracion3.jpg";
const galleryImages = [img1, img2, img3];
</script>
