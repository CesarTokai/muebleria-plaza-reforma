<template>
  <div class="login-container">
    <form class="login-form" @submit.prevent="handleLogin">
      <h2>Iniciar sesión</h2>
      <div class="form-group">
        <label for="username">Usuario</label>
        <input v-model="username" id="username" type="text" required />
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

const username = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);
const router = useRouter();

async function handleLogin() {
  error.value = '';
  loading.value = true;
  try {
    const res = await axios.doPost('/login', { username: username.value, password: password.value });
    if (res.data && res.data.token) {
      localStorage.setItem('token', res.data.token);
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
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(120deg, #faf6fa 60%, #f7e6ef 100%);
}
.login-form {
  background: #fff;
  padding: 2.5rem 2rem 2rem 2rem;
  border-radius: 18px;
  box-shadow: 0 4px 24px #86073418;
  min-width: 320px;
  max-width: 95vw;
}
.login-form h2 {
  color: #860734;
  font-weight: 800;
  margin-bottom: 1.5rem;
  text-align: center;
}
.form-group {
  margin-bottom: 1.2rem;
}
label {
  display: block;
  margin-bottom: 0.4rem;
  color: #860734;
  font-weight: 600;
}
input {
  width: 100%;
  padding: 0.7rem;
  border: 1.5px solid #ffd700;
  border-radius: 7px;
  font-size: 1rem;
  margin-bottom: 0.2rem;
}
button {
  width: 100%;
  background: #860734;
  color: #fff;
  font-weight: 700;
  border: none;
  border-radius: 7px;
  padding: 0.8rem 0;
  font-size: 1.1rem;
  margin-top: 0.7rem;
  transition: background 0.18s;
}
button:disabled {
  background: #bfa2b7;
  cursor: not-allowed;
}
.login-error {
  color: #e94e77;
  margin-top: 0.7rem;
  text-align: center;
  font-weight: 600;
}
</style>
