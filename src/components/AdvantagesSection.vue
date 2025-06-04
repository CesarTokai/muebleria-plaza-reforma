<template>
  <section class="advantages-section py-5">
    <div class="container advantages-row">
      <div class="adv-card">
        <div class="icon-circle shadow-sm mb-3">
          <i class="bi bi-truck"></i>
        </div>
        <h4>Envío rápido</h4>
        <p>Recibe tus muebles en tu domicilio</p>
      </div>
      <div class="adv-card">
        <div class="icon-circle shadow-sm mb-3">
          <!-- Icono personalizado para Personalización -->
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="15" fill="#ffd700" stroke="#860734" stroke-width="2"/>
            <rect x="8" y="14" width="16" height="4" rx="2" fill="#fff" stroke="#860734" stroke-width="1.5"/>
            <rect x="14" y="8" width="4" height="16" rx="2" fill="#fff" stroke="#860734" stroke-width="1.5"/>
          </svg>
        </div>
        <h4>Personalización</h4>
        <p>Colores y medidas a tu gusto</p>
      </div>
      <div class="adv-card">
        <div class="icon-circle shadow-sm mb-3">
          <i class="bi bi-credit-card-2-back"></i>
        </div>
        <h4>Crédito fácil</h4>
        <p>Pagos cómodos, sin buró</p>
      </div>
      <div class="adv-card">
        <div class="icon-circle shadow-sm mb-3">
          <!-- Rediseño del SVG de Mercado Pago para mayor claridad y equilibrio visual -->
          <svg width="48" height="32" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="32" rx="6" fill="#00579F"/>
            <ellipse cx="24" cy="16" rx="20" ry="10" fill="#fff"/>
            <path d="M16 16c2-2 14-2 16 0" fill="none" stroke="#00579F" stroke-width="2.5"/>
            <path d="M20 16c.7-1.5 7.3-1.5 8 0" fill="none" stroke="#00579F" stroke-width="2.5" stroke-linecap="round"/>
            <ellipse cx="24" cy="16" rx="8" ry="3" fill="#00579F" opacity="0.3"/>
          </svg>
        </div>
        <h4>Pagos por Mercado Pago</h4>
        <p>Compra segura y protegida</p>
      </div>
   
    </div>
  </section>
</template>

<script setup>
import './assets/styles.css';
</script>

<style scoped>

</style>
