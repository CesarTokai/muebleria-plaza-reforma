<template>
  <section class="map-section">
    <div class="container d-flex justify-content-center align-items-center">
      <div class="map-card shadow">
        <div class="map-icon mx-auto mb-2">
          <!-- Bootstrap icon (o FontAwesome, según tengas) -->
          <i class="bi bi-geo-alt-fill"></i>
        </div>
        <h3 class="map-title">¿Dónde estamos?</h3>
        <p class="map-subtitle">Ven a conocer nuestra sucursal o contáctanos para envío a domicilio.</p>
        <div class="map-frame-wrap">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120689.27438005756!2d-99.4238104!3d18.7309088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cddfa0a4aca6a5%3A0x4a8d740244bc1a1b!2sTetecala%2C%20Mor.!5e0!3m2!1ses!2smx!4v1716321238473!5m2!1ses!2smx"
            width="100%" height="340" allowfullscreen loading="lazy" style="border:0;"
          ></iframe>
        </div>
        <div class="d-flex justify-content-center mt-3">
          <a href="https://goo.gl/maps/9m4Mu6cA6Xw8odtn6" target="_blank" class="btn btn-outline-primary map-btn">
            <i class="bi bi-geo-alt"></i> Ver en Google Maps
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import './assets/styles.css';
</script>

<style scoped>

</style>
