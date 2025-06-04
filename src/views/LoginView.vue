<template>
  <div class="login-container">
    <form class="login-form" @submit.prevent="handleLogin">
      <h2>Iniciar sesión</h2>
      <div class="form-group">
        <label for="email">Ingresa tu correo electronico</label>
        <input v-model="email" id="email" type="text" required />
      </div>
      <div class="form-group">
        <label for="password">Contraseña</label>
        <input v-model="password" id="password" type="password" required />
      </div>
      <button type="submit" :disabled="loading">Entrar</button>
      <div v-if="error" class="login-error">{{ error }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from '../config/AxiosConfig';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);
const router = useRouter();

async function handleLogin() {
  error.value = '';
  loading.value = true;
  try {
    const res = await axios.doPost('/login', { email: email.value, password: password.value });
    if (res.data && (res.data.token || res.data.access_token)) {
      localStorage.setItem('token', res.data.token || res.data.access_token);
      router.push('/admin');
    } else {
      error.value = 'Credenciales incorrectas';
    }
  } catch (e) {
    error.value = 'Usuario o contraseña incorrectos';
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #af2e2e, #dd3939, #fad0c4);
  animation: gradient-animation 6s ease infinite;
}

@keyframes gradient-animation {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.login-form {
  background: rgba(255, 255, 255, 0.9);
  padding: 3rem 2.5rem;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  min-width: 320px;
  max-width: 400px;
  text-align: center;
  backdrop-filter: blur(10px);
}

.login-form h2 {
  color: #000000;
  font-weight: 800;
  margin-bottom: 2rem;
  font-size: 1.8rem;
}

.form-group {
  margin-bottom: 1.5rem;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 600;
}

input {
  width: 100%;
  padding: 0.8rem;
  border: 1.5px solid #fff461;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #fdff9a;
  outline: none;
}

button {
  width: 100%;
  background: linear-gradient(135deg, #ff6f61, #ff9a9e);
  color: #fff;
  font-weight: 700;
  border: none;
  border-radius: 8px;
  padding: 0.9rem 0;
  font-size: 1.2rem;
  margin-top: 1rem;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(255, 111, 97, 0.4);
}

button:disabled {
  background: #ffd1d1;
  cursor: not-allowed;
}

.login-error {
  color: #e94e77;
  margin-top: 1rem;
  text-align: center;
  font-weight: 600;
}
</style>
