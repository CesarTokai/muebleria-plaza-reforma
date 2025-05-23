<template>
  <div class="contact-form">
    <h2>Contáctanos</h2>
    <form @submit.prevent="handleSubmit">
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
        ></textarea>
        <span class="error-message" v-if="errors.message">{{ errors.message }}</span>
      </div>

      <button type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Enviando...' : 'Enviar' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

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
  // Validar todos los campos antes de enviar
  Object.keys(form.value).forEach(field => validateField(field));
  
  if (Object.values(errors.value).some(error => error !== '')) {
    return;
  }

  isSubmitting.value = true;
  
  // Simular envío a API (reemplaza con tu lógica real)
  try {
    await new Promise(resolve => setTimeout(resolve, 1500));
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
.contact-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background: #181515;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

input, textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

textarea {
  min-height: 120px;
  resize: vertical;
}

.error {
  border-color: #ff3860;
}

.error-message {
  color: #ff3860;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}

button {
  background-color: #860734;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background-color: #6a0530;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>