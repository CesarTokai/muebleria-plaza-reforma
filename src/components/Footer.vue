<template>
  <footer class="footer-section">
    <div class="container footer-row">
      <div class="footer-col footer-brand">
        <h4><i class="fas fa-couch"></i>Tetecala, Morelos, México </h4>
        <p><i class="fas fa-map-marker-alt"></i> 
        Mueblería Plaza Reforma tu mejor opcion de compra ,Consigue el mejor precio en el mejor lugar de muebles en toda la zona sur</p>
        <p><i class="fas fa-phone"></i> 734 153 2692</p>
        <p><i class="fas fa-clock"></i> Lunes a Sábado <span class="footer-horario">(9:00 AM - 8:00 PM)</span></p>
      </div>
      <div class="footer-col">
        <h4><i class="fas fa-star"></i> Especialidades</h4>
        <ul>
          <li><i class="fas fa-couch"></i> Muebles rústicos y modernos</li>
          <li><i class="fas fa-award"></i> 75 años de experiencia</li>
          <li><i class="fas fa-truck"></i> Entrega a domicilio</li>
          <li><i class="fas fa-credit-card"></i> Créditos internos</li>
        </ul>
      </div>
      <div class="footer-col footer-social">
        <h4><i class="fas fa-share-alt"></i> Síguenos</h4>
        <div class="footer-social-links">
          <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
          <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
          <a href="#" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
        </div>
        <small class="footer-copyright">
          &copy; {{ new Date().getFullYear() }} Mueblería Plaza Reforma
        </small>
      </div>
    </div>
  </footer>
</template>

<script setup>
import './assets/styles.css';
</script>

<style scoped>

</style>
