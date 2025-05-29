<template>
  <router-view />
</template>

<script setup>
// Por ahora no necesitamos lógica aquí
</script>

<style>
body, #app {
  margin: 0 !important;
  padding: 0 !important;
  width: 100vw !important;
  min-height: 100vh !important;
  max-width: none !important;
  background: #fff !important;
  display: block !important;
}

/* App.vue o main.css (NO en v-scroll-animate.js) */
.before-enter {
  opacity: 0;
  transform: translateX(60px); /* Cambia a -60px, Y, etc. según el efecto */
  transition: opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1);
  will-change: opacity, transform;
}
.enter {
  opacity: 1;
  transform: translateX(0);
}
</style>
