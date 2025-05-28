<template>
  <div class="contact-view">

    <main>
      
      <!-- Contenido principal: Form + Info -->
      <div class="container contact-main">
        <!-- Columna del formulario -->
        <section class="contact-form-col">
          <h2>Envíanos un mensaje</h2>
          <form class="contact-form" @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="name">Nombre:</label>
              <input 
                type="text" 
                id="name" 
                v-model="form.name" 
                @blur="validateField('name')"
                :class="{ 'error': errors.name }"
              >
              <span class="error-message" v-if="errors.name">{{ errors.name }}</span>
            </div>

            <div class="form-group">
              <label for="email">Correo:</label>
              <input 
                type="email" 
                id="email" 
                v-model="form.email" 
                @blur="validateField('email')"
                :class="{ 'error': errors.email }"
              >
              <span class="error-message" v-if="errors.email">{{ errors.email }}</span>
            </div>

            <div class="form-group">
              <label for="phone">Teléfono:</label>
              <input 
                type="tel" 
                id="phone" 
                v-model="form.phone" 
                @blur="validateField('phone')"
                :class="{ 'error': errors.phone }"
              >
              <span class="error-message" v-if="errors.phone">{{ errors.phone }}</span>
            </div>

            <div class="form-group">
              <label for="message">Mensaje:</label>
              <textarea 
                id="message" 
                v-model="form.message" 
                @blur="validateField('message')"
                :class="{ 'error': errors.message }"
                rows="4"
              ></textarea>
              <span class="error-message" v-if="errors.message">{{ errors.message }}</span>
            </div>

            <button type="submit" :disabled="isSubmitting">
              {{ isSubmitting ? 'Enviando...' : 'Enviar mensaje' }}
            </button>
          </form>
          <div class="whatsapp-helper">
            <span>¿Prefieres WhatsApp?</span>
            <a class="whatsapp-link" target="_blank" :href="whatsAppUrl">
              <i class="fab fa-whatsapp"></i> Escríbenos aquí
            </a>
          </div>
        </section>

        <!-- Columna info + mapa + horario/contacto -->
        <section class="contact-info-col">
          <div class="info-card map-card">
            <h3><i class="fas fa-map-marker-alt"></i> Dirección</h3>
            <div class="card-info-text">Tetecala, Morelos, México</div>
            <div class="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120689.27438005756!2d-99.4238104!3d18.7309088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cddfa0a4aca6a5%3A0x4a8d740244bc1a1b!2sTetecala%2C%20Mor.!5e0!3m2!1ses!2smx!4v1716321238473!5m2!1ses!2smx"
                width="100%" height="210" style="border:0;" allowfullscreen="" loading="lazy"
              ></iframe>
            </div>
          </div>
          <div class="info-bottom-row">
            <div class="info-card">
              <h3><i class="fas fa-clock"></i> Horario</h3>
              <ul class="schedule">
                <li><span>Lunes - Viernes:</span> 9:00 AM - 8:00 PM</li>
                <li><span>Sábado:</span> 9:00 AM - 6:00 PM</li>
                <li><span>Domingo:</span> Cerrado</li>
              </ul>
            </div>
            <div class="info-card">
              <h3><i class="fas fa-phone-alt"></i> Contacto directo</h3>
              <ul class="contact-methods">
                <li>
                  <a href="tel:7341532692"><i class="fas fa-phone"></i> 734 153 2692</a>
                </li>
                <li>
                  <a href="mailto:contacto@muebleriapr.com"><i class="fas fa-envelope"></i> contacto@muebleriapr.com</a>
                </li>
              </ul>
              <div class="help-msg">
                <i class="fas fa-info-circle"></i> Respuesta inmediata en horario laboral.
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
    <Footer />

    <!-- WhatsApp flotante -->
    <a
      :href="whatsAppUrl"
      class="whatsapp-float"
      target="_blank"
      aria-label="WhatsApp"
    >
      <i class="fab fa-whatsapp"></i>
    </a>
  </div>
</template>

<script setup>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import Navbar from '../components/Navbar.vue';
import { ref } from 'vue';

const whatsAppUrl = "https://wa.me/523411223344?text=Hola,%20quiero%20informes%20de%20muebles";

const form = ref({
  name: '',
  email: '',
  phone: '',
  message: ''
});

const errors = ref({
  name: '',
  email: '',
  phone: '',
  message: ''
});

const isSubmitting = ref(false);

const validateField = (field) => {
  const value = form.value[field];
  switch (field) {
    case 'name':
      errors.value.name = value.trim() === '' ? 'El nombre es requerido' : '';
      break;
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      errors.value.email = !emailRegex.test(value) ? 'Correo inválido' : '';
      break;
    case 'phone':
      const phoneRegex = /^[0-9]{10}$/;
      errors.value.phone = !phoneRegex.test(value) ? 'Teléfono debe tener 10 dígitos' : '';
      break;
    case 'message':
      errors.value.message = value.trim().length < 10 ? 'Mínimo 10 caracteres' : '';
      break;
  }
};

const handleSubmit = async () => {
  Object.keys(form.value).forEach(field => validateField(field));
  if (Object.values(errors.value).some(error => error !== '')) {
    return;
  }
  isSubmitting.value = true;
  try {
    await new Promise(resolve => setTimeout(resolve, 1400));
    alert('¡Mensaje enviado con éxito!');
    form.value = { name: '', email: '', phone: '', message: '' };
  } catch (error) {
    alert('Error al enviar el mensaje');
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
/* ----- Layout global y branding ----- */
.contact-view {
  background: #f9f5fa;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* --- Header --- */
.contact-header {
  background: linear-gradient(135deg, #860734 90%, #440224 100%);
  color: #ffd700;
  text-align: center;
  padding: 2.2rem 0 1.5rem;
  border-radius: 0 0 2.2rem 2.2rem;
  margin-bottom: 1.2rem;
  box-shadow: 0 6px 34px #86073419;
}
.contact-header h1 {
  color: #fff;
  font-size: 2.3rem;
  letter-spacing: 2px;
  margin-bottom: 0.8rem;
  font-weight: 900;
}
.contact-header p {
  font-size: 1.09rem;
  font-weight: 600;
  color: #ffd700;
  margin-bottom: 0;
}

/* --- Main grid --- */
.container {
  width: 100%;
  max-width: 1150px;
  margin: 0 auto;
  padding: 0 1rem;
}
.contact-main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 1.5rem;
}
@media (max-width: 900px) {
  .contact-main {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

/* --- Formulario --- */
.contact-form-col {
  background: #fff;
  border-radius: 1.5rem;
  box-shadow: 0 6px 24px #86073412;
  padding: 2rem 2rem 1.3rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.contact-form-col h2 {
  color: #860734;
  margin-bottom: 1.1rem;
  font-size: 1.3rem;
  font-weight: 800;
}

/* Form inside */
.contact-form {
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1.08rem;
}
.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.19rem;
}
label {
  color: #860734;
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 0.13rem;
}
input, textarea {
  width: 100%;
  padding: 0.72em 1em;
  border: 1.6px solid #eee;
  border-radius: 8px;
  background: #faf8fa;
  font-size: 1.07rem;
  font-family: inherit;
  transition: border-color 0.17s, box-shadow 0.17s;
  box-sizing: border-box;
  resize: vertical;
}
input:focus, textarea:focus {
  border-color: #860734;
  outline: none;
  background: #fff;
  box-shadow: 0 2px 8px #86073422;
}
input.error, textarea.error {
  border-color: #e94e77;
  background: #fff0f3;
}
.error-message {
  color: #e94e77;
  font-size: 0.92em;
  margin-top: 2px;
  margin-bottom: 0;
  min-height: 1em;
}
button[type="submit"] {
  background: #860734;
  color: #ffd700;
  font-weight: 700;
  font-size: 1.09rem;
  border: none;
  border-radius: 22px;
  padding: 0.85rem 0;
  cursor: pointer;
  margin-top: 0.3em;
  transition: background 0.15s, color 0.13s, box-shadow 0.15s, transform 0.13s;
  box-shadow: 0 2px 8px #86073419;
  width: 100%;
}
button[type="submit"]:hover:not(:disabled) {
  background: #a81552;
  color: #fffde6;
  transform: translateY(-2px) scale(1.03);
}
button[type="submit"]:disabled {
  opacity: 0.8;
  cursor: not-allowed;
  background: #9a9a9a;
}

/* WhatsApp CTA */
.whatsapp-helper {
  text-align: center;
  margin-top: 1.1rem;
}
.whatsapp-link {
  display: inline-flex;
  align-items: center;
  gap: 0.45em;
  background: #25d366;
  color: #fff;
  font-weight: 700;
  padding: 0.48rem 1.18rem;
  border-radius: 22px;
  font-size: 1.01rem;
  margin-top: 0.42em;
  box-shadow: 0 2px 8px #25d3661c;
  text-decoration: none;
  transition: background 0.15s, transform 0.17s;
}
.whatsapp-link:hover { background: #128C7E; transform: translateY(-2px) scale(1.06);}
.whatsapp-link i { font-size: 1.16em; }

/* --- Info columna --- */
.contact-info-col {
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
}
.info-card {
  background: #180a19;
  color: #fff;
  border-radius: 1.1rem;
  box-shadow: 0 4px 16px #86073412;
  padding: 1.1rem 1rem 1rem 1rem;
  margin-bottom: 0;
  width: 100%;
}
.info-card h3 {
  color: #ffd700;
  margin-bottom: 0.7rem;
  font-size: 1.09rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.card-info-text { font-size: 1em; margin-bottom: 1em; }
.map-container {
  margin: 0 auto;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 12px #ffd7001c;
  border: 1.8px solid #ffd70038;
}

/* Horario y contacto */
.info-bottom-row {
  display: flex;
  gap: 1.1rem;
  margin-top: 0.4rem;
}
@media (max-width: 700px) {
  .info-bottom-row {
    flex-direction: column;
    gap: 0.7rem;
  }
}

.schedule, .contact-methods {
  margin: 0;
  padding: 0;
  list-style: none;
}
.schedule li, .contact-methods li {
  margin-bottom: 0.7rem;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 1.01rem;
}
.schedule span {
  font-weight: 700;
  min-width: 110px;
  color: #ffd700;
}
.contact-methods a {
  color: #fff;
  text-decoration: none;
  font-weight: 700;
  transition: color 0.13s;
}
.contact-methods a:hover { color: #ffd700; text-decoration: underline; }
.help-msg {
  color: #ffd700;
  font-size: 0.93em;
  margin-top: 0.44em;
  display: flex;
  align-items: center;
  gap: 0.4em;
}
.fas { color: #ffd700; width: 22px; text-align: center; font-size: 1.12em; }

/* WhatsApp flotante */
.whatsapp-float {
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 99;
  background: #25d366;
  color: #fff;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.85rem;
  box-shadow: 0 4px 18px #25d36655;
  transition: background 0.15s, transform 0.15s;
  animation: floatWhats 1.5s infinite alternate;
}
.whatsapp-float:hover { background: #128C7E; transform: scale(1.13); }
@keyframes floatWhats { to { transform: translateY(-6px) scale(1.03); } }

/* --- 100% Mobile Ready --- */
@media (max-width: 700px) {
  .container { padding: 0 0.15rem; }
  .contact-header { padding: 1.1rem 0 0.7rem 0; border-radius: 0 0 1rem 1rem;}
  .contact-main { grid-template-columns: 1fr; gap: 0.7rem; }
  .contact-form-col, .contact-info-col {
    border-radius: 1rem;
    padding: 0.9rem 0.2rem;
    box-shadow: none;
    min-width: 0;
  }
  .form-card, .info-card, .map-card {
    padding: 0.75rem 0.13rem;
    border-radius: 0.8rem;
    margin-bottom: 0.7rem;
    min-width: 0;
  }
  .map-container iframe {
    min-width: 0;
    width: 100%;
    min-height: 130px;
    max-width: 100vw;
    border-radius: 9px;
    display: block;
  }
  .whatsapp-float {
    width: 42px;
    height: 42px;
    font-size: 1.2rem;
    bottom: 10px;
    right: 10px;
  }
  .contact-header h1 { font-size: 1.5rem; }
}

/* Estilo base para box-sizing y elimina scroll lateral */
*, *::before, *::after { box-sizing: border-box; }
html, body {
  width: 100vw;
  max-width: 100vw;
  overflow-x: hidden;
  padding: 0;
  margin: 0;
}
</style>
