<template>
  <section class="cta-section">
    <div class="cta-container">
      <div class="cta-card shadow">
        <h3 class="cta-title">¿Listo para renovar tu hogar?</h3>
        <p class="cta-subtitle">Contáctanos y obtén tu cotización sin compromiso.</p>
        <a
          href="https://wa.me/5217341532692"
          class="cta-btn"
          target="_blank"
        >
          <i class="fab fa-whatsapp"></i>
          Escríbenos por WhatsApp
        </a>
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style scoped>
.cta-section {
  background: linear-gradient(105deg, #ffe7f2 0%, #f7e6ef 75%, #86073411 100%);
  padding: 3.8rem 0 3.3rem 0;
  border-radius: 2rem;
  margin-bottom: 2.5rem;
  box-shadow: 0 8px 38px #86073412;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cta-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.cta-card {
  background: #fff;
  border-radius: 30px;
  padding: 2.5rem 2.2rem 2.2rem 2.2rem;
  text-align: center;
  min-width: 270px;
  max-width: 480px;
  margin: 0 auto;
  box-shadow: 0 4px 32px #86073422;
  position: relative;
  z-index: 2;
  border: 2px solid #fff4f8;
}

.cta-title {
  color: #860734;
  font-size: 2.1rem;
  font-weight: 800;
  letter-spacing: 1px;
  margin-bottom: 0.7rem;
}

.cta-subtitle {
  color: #412140;
  font-size: 1.15rem;
  margin-bottom: 2.2rem;
  font-weight: 500;
  letter-spacing: 0.3px;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  background: linear-gradient(90deg, #25D366 85%, #860734 120%);
  color: #fff !important;
  font-weight: bold;
  font-size: 1.14rem;
  padding: 1rem 2.2rem;
  border-radius: 30px;
  box-shadow: 0 3px 16px #25d3662a;
  border: none;
  text-decoration: none;
  transition: background 0.23s, transform 0.19s, box-shadow 0.18s;
  letter-spacing: 1px;
  outline: none;
  position: relative;
  overflow: hidden;
  z-index: 2;
}
.cta-btn i {
  font-size: 1.7rem;
  color: #fff;
  transition: transform 0.23s;
  filter: drop-shadow(0 2px 5px #25d36644);
}
.cta-btn:hover {
  background: linear-gradient(90deg, #23bd5e 60%, #a03b68 100%);
  transform: translateY(-4px) scale(1.04);
  box-shadow: 0 7px 34px #25d36641;
}
.cta-btn:hover i {
  transform: scale(1.12) rotate(-10deg);
}

@media (max-width: 600px) {
  .cta-section { padding: 1.2rem 0 1.2rem 0; border-radius: 1.1rem; }
  .cta-card { border-radius: 17px; padding: 1.6rem 0.9rem; }
  .cta-title { font-size: 1.3rem; }
  .cta-btn { font-size: 1rem; padding: 0.8rem 1.2rem; }
}
</style>
