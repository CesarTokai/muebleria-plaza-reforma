<template>
    <main>
        <!-- Formulario -->
        <section class="contact-form-col">
          <!-- Solo la parte del formulario mejorada -->
            <h2><i class="fas fa-paper-plane"></i> Envíanos un mensaje</h2>
            <form class="contact-form" @submit.prevent="handleSubmit" autocomplete="off">
              <div class="form-group">
                <label for="name"><i class="fas fa-user"></i> Nombre</label>
                <input type="text" id="name" v-model="form.name" @blur="validateField('name')"
                  :class="{ error: errors.name }" autocomplete="name" placeholder="Tu nombre completo" />
                <span class="error-message" v-if="errors.name">{{ errors.name }}</span>
              </div>

              <div class="form-group">
                <label for="email"><i class="fas fa-envelope"></i> Correo</label>
                <input type="email" id="email" v-model="form.email" @blur="validateField('email')"
                  :class="{ error: errors.email }" autocomplete="email" placeholder="tucorreo@ejemplo.com" />
                <span class="error-message" v-if="errors.email">{{ errors.email }}</span>
              </div>

              <div class="form-group">
                <label for="phone"><i class="fas fa-phone"></i> Teléfono</label>
                <input type="tel" id="phone" v-model="form.phone" @blur="validateField('phone')"
                  :class="{ error: errors.phone }" autocomplete="tel" placeholder="10 dígitos" />
                <span class="error-message" v-if="errors.phone">{{ errors.phone }}</span>
              </div>

              <div class="form-group">
                <label for="message"><i class="fas fa-comment-alt"></i> Mensaje</label>
                <textarea id="message" v-model="form.message" @blur="validateField('message')"
                  :class="{ error: errors.message }" rows="4" placeholder="¿En qué podemos ayudarte?"></textarea>
                <span class="error-message" v-if="errors.message">{{ errors.message }}</span>
              </div>

              <button type="submit" :disabled="isSubmitting">
                {{ isSubmitting ? 'Enviando...' : 'Enviar mensaje' }}
              </button>
              <div class="form-note">
                <i class="fas fa-shield-alt"></i> Tus datos están protegidos y no serán compartidos.
              </div>
            </form>

          </section>

    </main>

    

</template>

<script setup>
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
.contact-view {
  background: #f6f6fb;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.contact-header {
  background: linear-gradient(135deg, #860734 80%, #d59fa9 100%);
  color: #fff;
  text-align: center;
  padding: 2.3rem 0 1.6rem;
  border-radius: 0 0 2.2rem 2.2rem;
  margin-bottom: 1.3rem;
  box-shadow: 0 6px 36px #860733;
}

.contact-header h1 {
  font-size: 2.25rem;
  font-weight: 900;
  margin-bottom: 0.7rem;
}

.contact-header p {
  font-size: 1.07rem;
  font-weight: 600;
  margin-bottom: 0;
  color: #fffde6;
}

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
  border-radius: 1.4rem;
  background: #ffffff !important;
  box-shadow: 0 6px 28px #ff025a98;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8rem;
  padding: 2.5rem 2rem 2rem 2rem; /* Espaciado interno para separar el contenido del borde */
  box-sizing: border-box;
}

@media (max-width: 900px) {
  .contact-form-col {
    margin-top: 4rem;
    padding: 1.5rem 0.7rem 1.2rem 0.7rem; /* Menos padding en móvil */
  }
}

input, textarea {
  background: #fffdfa !important;
  color: #fff8fe !important;
}

.contact-form-col h2 {
  color: #a81552;
  margin-bottom: 1.05rem;
  font-size: 1.27rem;
  font-weight: 800;
}

.contact-form {
  width: 100%;
  max-width: 900px; /* Aumentado para inputs más anchos */
  margin: 0 auto;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1.07rem;
}


.contact-form-col, .contact-form {
  background: #ffffff !important;
}
.contact-form, .contact-form * {
  background: transparent !important;
}
input, textarea, select, button {
  background: #ffffff !important;
  color: #22081e !important;
}


.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.18rem;
}

label {
  color: #a81552;
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 0.13rem;
}

input,
textarea {
  width: 100%;
  padding: 0.7em 1em;
  border: 1.5px solid #ecd5e7;
  border-radius: 8px;
  background: #faf6fa;
  font-size: 1.07rem;
  font-family: inherit;
  transition: border-color 0.16s, box-shadow 0.15s;
  box-sizing: border-box;
  resize: vertical;
}

input:focus,
textarea:focus {
  border-color: #a81552;
  outline: none;
  background: #fff;
  box-shadow: 0 2px 9px #fffefe;
}

input.error,
textarea.error {
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
  background: linear-gradient(90deg, #a81552 65%, #860734 100%);
  color: #ff23146e;
  font-weight: 700;
  font-size: 1.09rem;
  border: none;
  border-radius: 22px;
  padding: 0.82rem 0;
  cursor: pointer;
  margin-top: 0.3em;
  transition: background 0.15s, color 0.13s, box-shadow 0.16s, transform 0.13s;
  box-shadow: 0 2px 9px #963b3b;
  width: 100%;
}

button[type="submit"]:hover:not(:disabled) {
  background: linear-gradient(90deg, #d59fa9 5%, #a81552 80%);
  color: #860734;
  transform: translateY(-2px) scale(1.03);
}

button[type="submit"]:disabled {
  opacity: 0.75;
  cursor: not-allowed;
  background: #c0b7be;
}

/* WhatsApp CTA */
.whatsapp-helper {
  text-align: center;
  margin-top: 1.2rem;
}

.whatsapp-link {
  display: inline-flex;
  align-items: center;
  gap: 0.43em;
  background: #25d366;
  color: #fff;
  font-weight: 700;
  padding: 0.48rem 1.1rem;
  border-radius: 22px;
  font-size: 1.01rem;
  margin-top: 0.41em;
  box-shadow: 0 2px 8px #25d36615;
  text-decoration: none;
  transition: background 0.13s, transform 0.17s;
}

.whatsapp-link:hover {
  background: #128C7E;
  transform: translateY(-2px) scale(1.05);
}

.whatsapp-link i {
  font-size: 1.12em;
}

/* --- Info columna --- */
.contact-info-col {
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
}

.info-card {
  background: linear-gradient(120deg, #fff8f8 70%, #f4e2e8 100%);
  color: #740f34;
  border-radius: 1.1rem;
  box-shadow: 0 4px 16px #ffffff;
  padding: 1.1rem 1rem 1rem 1rem;
  margin-bottom: 0;
  width: 100%;
}

.info-card h3 {
  color: #a81552;
  margin-bottom: 0.7rem;
  font-size: 1.09rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.card-info-text {
  font-size: 1em;
  margin-bottom: 1em;
}

.map-container {
  margin: 0 auto;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 12px #ffffff13;
  border: 1.5px solid #e9b6c7;
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

.schedule,
.contact-methods {
  margin: 0;
  padding: 0;
  list-style: none;
}

.schedule li,
.contact-methods li {
  margin-bottom: 0.7rem;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 1.01rem;
}

.schedule span {
  font-weight: 700;
  min-width: 110px;
  color: #a81552;
}

.contact-methods a {
  color: #740f34;
  text-decoration: none;
  font-weight: 700;
  transition: color 0.13s;
}

.contact-methods a:hover {
  color: #a81552;
  text-decoration: underline;
}

.help-msg {
  color: #a81552;
  font-size: 0.93em;
  margin-top: 0.44em;
  display: flex;
  align-items: center;
  gap: 0.4em;
}

.fas {
  color: #a81552;
  width: 22px;
  text-align: center;
  font-size: 1.12em;
}

/* WhatsApp flotante */
.whatsapp-float {
  position: fixed;
  bottom: 26px;
  right: 26px;
  z-index: 99;
  background: #25d366;
  color: #fff;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.72rem;
  box-shadow: 0 4px 18px #25d3663a;
  transition: background 0.14s, transform 0.13s;
  animation: floatWhats 1.5s infinite alternate;
}

.whatsapp-float:hover {
  background: #128C7E;
  transform: scale(1.09);
}

.whatsapp-float i {
  color: #fff !important;
  font-size: 1.4em;
  line-height: 1;
}

@keyframes floatWhats {
  to {
    transform: translateY(-6px) scale(1.03);
  }
}

/* --- Responsive full mobile --- */
@media (max-width: 700px) {
  .container {
    padding: 0 0.11rem;
  }

  .contact-header {
    padding: 1.1rem 0 0.7rem 0;
    border-radius: 0 0 1rem 1rem;
  }

  .contact-main {
    grid-template-columns: 1fr;
    gap: 0.7rem;
  }

  .contact-form-col,
  .contact-info-col {
    border-radius: 1rem;
    box-shadow: none;
    min-width: 0;
  }

  .info-card,
  .map-card {
    padding: 0.7rem 0.1rem;
    border-radius: 0.8rem;
    margin-bottom: 0.65rem;
    min-width: 0;
  }

  .map-container iframe {
    min-width: 0;
    width: 100%;
    min-height: 130px;
    max-width: 100vw;
    border-radius: 8px;
    display: block;
  }

  .whatsapp-float {
    width: 38px;
    height: 38px;
    font-size: 1.1rem;
    bottom: 10px;
    right: 10px;
  }

  .contact-header h1 {
    font-size: 1.45rem;
  }
}

@media (max-width: 768px) {
  .contact-form-bg {
    padding: 1.2rem 0;
  }
  .contact-form-wrapper {
    max-width: 98vw;
    padding: 1.5rem 0.7rem 1.2rem 0.7rem;
    border-radius: 16px;
  }
}

@media (max-width: 480px) {
  .contact-form-col {
    padding: 1rem 0.5rem 0.8rem 0.5rem;
    width: 100%; /* Cambiado de 100vw a 100% para evitar overflow */
    min-width: 0;
    box-sizing: border-box;
  }
  .contact-form-col h2 {
    font-size: 1.05rem;
    padding-left: 0.2rem;
    padding-right: 0.2rem;
  }
  .contact-form {
    gap: 0.7rem;
    width: 100%;
    min-width: 0;
  }
  label {
    font-size: 0.93rem;
  }
  input,
  textarea {
    font-size: 0.97rem;
    padding: 0.6em 0.6em;
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
  }
  button[type="submit"] {
    font-size: 0.97rem;
    padding: 0.7rem 0;
    border-radius: 16px;
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
  }
  .form-note {
    font-size: 0.85rem;
    padding-left: 0.2rem;
    padding-right: 0.2rem;
  }
}

/* Fix box-sizing y elimina scroll lateral */
*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body {
  width: 100vw;
  max-width: 100vw;
  overflow-x: hidden;
  padding: 0;
  margin: 0;
}
</style>
