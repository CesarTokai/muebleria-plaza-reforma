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
// Si usas Bootstrap Icons, importa en tu main.js o index.html:
  // <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
</script>

<style scoped>
.map-section {
  background: radial-gradient(ellipse at 60% 10%, #ffe8f0 0%, #faf6fa 60%, #f7e6ef 100%);
  padding: 3.2rem 0 3.3rem 0;
  margin-bottom: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 30px #8607340c;
}

.map-card {
  background: rgba(255,255,255,0.86);
  border-radius: 34px;
  box-shadow: 0 8px 42px #8607341b, 0 1px 16px #ffd70014 inset;
  max-width: 730px;
  margin: 0 auto;
  padding: 2.3rem 1.4rem 1.7rem 1.4rem;
  border: 2.3px solid #fff4f8;
  position: relative;
  backdrop-filter: blur(4.5px);
  animation: fadeInUp 0.8s cubic-bezier(.68,-0.55,.27,1.55) backwards;
  transition: box-shadow 0.21s;
}

.map-card:hover {
  box-shadow: 0 12px 48px #86073423, 0 2px 28px #ffd70016 inset;
}

.map-icon {
  background: linear-gradient(135deg, #ffd700 50%, #860734 100%);
  color: #fff;
  width: 56px; height: 56px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 2rem;
  box-shadow: 0 4px 18px #86073418;
  margin-bottom: 0.9rem;
}

.map-title {
  color: #860734;
  font-size: 2.05rem;
  font-weight: 900;
  letter-spacing: 1px;
  margin-bottom: 0.7rem;
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
  opacity: 0.98;
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

.map-btn {
  font-weight: 700;
  font-size: 1.04rem;
  border-radius: 40px;
  padding: 0.7rem 2.2rem;
  background: #fff;
  color: #860734;
  border: 2px solid #ffd700;
  box-shadow: 0 1px 10px #ffd70019;
  margin-top: 1rem;
  transition: background 0.18s, color 0.18s, border 0.16s;
}
.map-btn:hover {
  background: #ffd700;
  color: #860734;
  border: 2px solid #860734;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(50px) scale(0.96);}
  to { opacity: 1; transform: none;}
}

@media (max-width: 800px) {
  .map-card { border-radius: 18px; }
  .map-section { padding: 1.3rem 0 1.3rem 0; border-radius: 1.2rem; }
}
@media (max-width: 600px) {
  .map-card { padding: 0.5rem 0.1rem 1rem 0.1rem; }
  .map-title { font-size: 1.18rem; }
  .map-frame-wrap { border-radius: 9px; }
}
</style>
