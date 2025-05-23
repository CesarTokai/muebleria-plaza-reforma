<template>
  <div class="contact-view">
    <navbar />
    <Header />
    <main>
      <!-- Sección de título -->
      <section class="contact-header">
        <div class="container">
          <h1>Contáctanos</h1>
          <p>Visítanos o escríbenos para más información</p>
        </div>
      </section>

      <!-- Contenido principal -->
      <div class="container contact-container">
        <!-- Formulario -->
        <div class="contact-form-section">
          <h2>Envíanos un mensaje</h2>
          <ContactForm />
        </div>

        <!-- Info de contacto -->
        <div class="contact-info">
          <div class="info-card">
            <h3><i class="fas fa-map-marker-alt"></i> Dirección</h3>
            <p>Tetecala, Morelos, México</p>
            <div class="map-container">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120689.27438005756!2d-99.4238104!3d18.7309088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cddfa0a4aca6a5%3A0x4a8d740244bc1a1b!2sTetecala%2C%20Mor.!5e0!3m2!1ses!2smx!4v1716321238473!5m2!1ses!2smx" 
                width="100%" 
                height="300" 
                style="border:0;" 
                allowfullscreen="" 
                loading="lazy"
              ></iframe>
            </div>
          </div>

          <div class="info-card">
            <h3><i class="fas fa-clock"></i> Horario</h3>
            <ul class="schedule">
              <li><span>Lunes - Viernes:</span> 9:00 AM - 8:00 PM</li>
              <li><span>Sábado:</span> 9:00 AM - 6:00 PM</li>
              <li><span>Domingo:</span> Cerrado</li>
            </ul>
          </div>

          <div class="info-card">
            <h3><i class="fas fa-phone-alt"></i> Contacto Directo</h3>
            <ul class="contact-methods">
              <li><i class="fas fa-phone"></i> 734 153 2692</li>
              <li><i class="fas fa-envelope"></i> contacto@muebleriapr.com</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import ContactForm from '../components/ContactForm.vue';
import Navbar from '../components/Navbar.vue';
</script>

<style scoped>
.contact-view {
  background-color: #f9f9f9;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.contact-header {
  background: linear-gradient(rgba(134, 7, 52, 0.8), rgba(134, 7, 52, 0.8)), 
              url('/assets/img/contact-bg.jpg') center/cover;
  color: rgb(5, 3, 3);
  padding: 4rem 0;
  text-align: center;
}

.contact-header h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.contact-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  padding: 3rem 0;
}

.contact-form-section {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

.contact-form-section h2 {
  color: #860734;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-card {
  background: rgb(14, 8, 8);
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

.info-card h3 {
  color: #860734;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.map-container {
  margin-top: 1rem;
  border-radius: 8px;
  overflow: hidden;
}

.schedule li, .contact-methods li {
  margin-bottom: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.schedule span {
  font-weight: 600;
  min-width: 120px;
  display: inline-block;
}

.fas {
  color: #860734;
  width: 20px;
  text-align: center;
}

/* Responsive */
@media (max-width: 992px) {
  .contact-container {
    grid-template-columns: 1fr;
  }
  
  .contact-header h1 {
    font-size: 2.5rem;
  }
}
</style>