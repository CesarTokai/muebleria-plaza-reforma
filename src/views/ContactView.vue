<template>
  <div class="contact-view">
    <Navbar />
    <Header />

    <main>
      <!-- Título y subtítulo -->
      <section class="contact-header">
        <div class="container">
          <h1>Contáctanos</h1>
          <p>Visítanos, llama o escríbenos para resolver todas tus dudas y cotizaciones.</p>
        </div>
      </section>

      <!-- Contenido principal: Form + Info -->
      <div class="container contact-main">
        <!-- Columna del formulario -->
        <section class="contact-form-col">
          <h2>Envíanos un mensaje</h2>
          <div class="form-card">
            <ContactForm />
          </div>
        
        </section>

       
      </div>
    </main>
   

    <!-- WhatsApp flotante -->
    <a
      :href="whatsAppUrl"
      class="whatsapp-float"
      target="_blank"
      aria-label="WhatsApp"
    >
      <i class="fab fa-whatsapp"></i>
    </a>
     <Footer />
  </div>
</template>

<script setup>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import ContactForm from '../components/ContactForm.vue';
import Navbar from '../components/Navbar.vue';

const whatsAppUrl = "https://wa.me/523411223344?text=Hola,%20quiero%20informes%20de%20muebles";
</script>


<style>
/* Evita que cualquier elemento sobresalga en móvil */
html, body, #app, .contact-view {
  width: 100%;
  max-width: 100vw !important;
  min-width: 0 !important;
  overflow-x: hidden !important;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

/* Haz que el grid principal siempre se adapte en móvil */
@media (max-width: 800px) {
  .container,
  .contact-main {
    max-width: 100vw !important;
    width: 100% !important;
    box-sizing: border-box;
    padding-left: 0 !important;
    padding-right: 0 !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
    overflow-x: hidden !important;
  }
  .contact-main {
    grid-template-columns: 1fr !important;
    gap: 0.5rem !important;
  }
  .contact-form-col,
  .contact-info-col {
    min-width: 0 !important;
    max-width: 100vw !important;
    width: 100% !important;
    box-sizing: border-box;
    padding: 0.9rem 0.1rem !important;
    border-radius: 1rem !important;
    margin: 0 auto 0.7rem auto !important;
  }
  .form-card,
  .info-card,
  .map-card {
    padding: 0.6rem 0.1rem !important;
    border-radius: 0.7rem !important;
    margin-bottom: 0.5rem !important;
    width: 100% !important;
    min-width: 0 !important;
    box-sizing: border-box;
  }
  .map-container {
    width: 100% !important;
    min-width: 0 !important;
  }
  .map-container iframe {
    min-width: 0 !important;
    width: 100% !important;
    min-height: 130px !important;
    max-width: 100vw !important;
    border-radius: 9px !important;
    box-sizing: border-box;
    display: block;
  }
  .whatsapp-float {
    right: 12px !important;
    bottom: 12px !important;
  }
}

/* Asegura que todo hijo de .container no se pase de ancho */
.container > * {
  max-width: 100% !important;
  min-width: 0 !important;
  box-sizing: border-box;
}

</style>
