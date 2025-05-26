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
          <i class="bi bi-sofa"></i>
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
          <!-- SVG Mercado Libre (amarillo) -->
          <svg height="32" viewBox="0 0 48 32">
            <ellipse cx="24" cy="16" rx="23" ry="12" fill="#ffe600"/>
            <ellipse cx="24" cy="16" rx="20" ry="10" fill="#fff"/>
            <path d="M11.5 17.5C15 21.5 33 21.5 36.5 17.5" fill="none" stroke="#ffd600" stroke-width="2"/>
            <path d="M19.3 17.5c.8-2.2 8.6-2.2 9.4 0" fill="none" stroke="#ffd600" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <h4>Pagos por Mercado Libre</h4>
        <p>Compra segura y protegida</p>
      </div>
   
    </div>
  </section>
</template>

<script setup>
// Sin lógica JS
</script>

<style scoped>
.advantages-section {
  background: linear-gradient(135deg, #faf6fa 60%, #f7e6ef 100%);
  border-radius: 24px;
  margin-bottom: 2rem;
  box-shadow: 0 6px 30px #8607340c;
}

.advantages-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2.5rem;
}

.adv-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 24px #86073420;
  text-align: center;
  padding: 2.2rem 1.6rem 1.7rem 1.6rem;
  min-width: 220px;
  max-width: 320px;
  transition: transform 0.19s, box-shadow 0.18s;
  position: relative;
  border: 1.5px solid #fff4f8;
}

.adv-card:hover {
  transform: translateY(-10px) scale(1.03);
  box-shadow: 0 6px 40px #86073435;
  border: 1.5px solid #86073440;
  z-index: 2;
}

.icon-circle {
  background: linear-gradient(135deg, #fff, #fce4ec 80%);
  border-radius: 50%;
  width: 66px;
  height: 66px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.3rem auto;
  box-shadow: 0 2px 12px #86073414;
}

.icon-circle i {
  font-size: 2.2rem;
  color: #860734;
  transition: color 0.15s;
  display: block;
}

.icon-circle svg {
  width: 2.5rem;
  height: 2.5rem;
  display: block;
}

.adv-card:hover .icon-circle i,
.adv-card:hover .icon-circle svg {
  filter: brightness(1.2) drop-shadow(0 1px 4px #ffd70055);
}

.adv-card h4 {
  font-weight: 800;
  font-size: 1.17rem;
  color: #860734;
  margin-bottom: 0.6rem;
  letter-spacing: 1px;
}

.adv-card p {
  color: #444;
  font-size: 1.07rem;
  font-weight: 500;
}

@media (max-width: 900px) {
  .advantages-row {
    gap: 1.4rem;
  }
  .adv-card {
    padding: 1.4rem 1rem;
    min-width: 190px;
  }
}

@media (max-width: 600px) {
  .advantages-row {
    flex-direction: column;
    align-items: center;
    gap: 1.2rem;
  }
  .adv-card {
    width: 95%;
    max-width: 400px;
    margin-bottom: 0.5rem;
  }
}
</style>
