<template>
  <section class="map-section">
    <div class="container">
      <div class="map-card shadow">
        <h3 class="map-title">¿Dónde estamos?</h3>
        <p class="map-subtitle">Ven a conocer nuestra sucursal o contáctanos para envío a domicilio.</p>
        <div class="map-frame-wrap">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120689.27438005756!2d-99.4238104!3d18.7309088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cddfa0a4aca6a5%3A0x4a8d740244bc1a1b!2sTetecala%2C%20Mor.!5e0!3m2!1ses!2smx!4v1716321238473!5m2!1ses!2smx"
            width="100%" height="340" allowfullscreen="" loading="lazy" style="border:0;"
          ></iframe>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style scoped>
.map-section {
  background: linear-gradient(120deg, #faf6fa 90%, #f7e6ef 100%);
  border-radius: 2rem;
  padding: 3.2rem 0 3.3rem 0;
  margin-bottom: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 30px #8607340c;
}

.map-card {
  background: #fff;
  border-radius: 34px;
  box-shadow: 0 6px 38px #8607341c;
  max-width: 730px;
  margin: 0 auto;
  padding: 2.1rem 1.3rem 1.5rem 1.3rem;
  border: 1.5px solid #fff4f8;
  position: relative;
  animation: fadeInUp 0.8s cubic-bezier(.68,-0.55,.27,1.55) backwards;
}

.map-title {
  color: #860734;
  font-size: 2.1rem;
  font-weight: 800;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
  text-align: center;
  text-shadow: 0 2px 8px #86073412;
}
.map-subtitle {
  color: #412140;
  text-align: center;
  font-size: 1.08rem;
  margin-bottom: 2rem;
  letter-spacing: 0.2px;
  font-weight: 500;
}

.map-frame-wrap {
  border-radius: 23px;
  overflow: hidden;
  box-shadow: 0 2px 20px #86073416;
  border: 1.5px solid #eee;
  background: #fff;
  transition: box-shadow 0.18s;
}
.map-frame-wrap:hover {
  box-shadow: 0 5px 38px #86073422;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(50px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@media (max-width: 800px) {
  .map-card { border-radius: 18px; }
  .map-section { padding: 1.3rem 0 1.3rem 0; border-radius: 1.2rem; }
}
@media (max-width: 600px) {
  .map-card { padding: 0.6rem 0.2rem 0.8rem 0.2rem; }
  .map-title { font-size: 1.15rem; }
  .map-frame-wrap { border-radius: 12px; }
}
</style>
