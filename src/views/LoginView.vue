<template>
  <div class="login-container">
    <form v-if="!resetStep" class="login-form" @submit.prevent="handleLogin">
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
      <button type="button" class="reset-password-btn" @click="startResetPassword">¿Olvidaste tu contraseña?</button>
    </form>

    <form v-else-if="resetStep === 1" class="login-form" @submit.prevent="requestReset">
      <h2>Restablecer contraseña</h2>
      <div class="form-group">
        <label for="reset-email">Ingresa tu correo electrónico</label>
        <input v-model="email" id="reset-email" type="text" required />
      </div>
      <button type="submit" :disabled="loading">Enviar código</button>
      <div v-if="error" class="login-error">{{ error }}</div>
    </form>

    <form v-else-if="resetStep === 2" class="login-form" @submit.prevent="verifyCode">
      <h2>Verificar código</h2>
      <div class="form-group">
        <label for="code">Código de verificación</label>
        <input v-model="code" id="code" type="text" required />
      </div>
      <button type="submit" :disabled="loading">Verificar</button>
      <div v-if="error" class="login-error">{{ error }}</div>
    </form>

    <form v-else-if="resetStep === 3" class="login-form" @submit.prevent="resetPassword">
      <h2>Restablecer contraseña</h2>
      <div class="form-group">
        <label for="new-password">Nueva contraseña</label>
        <input v-model="newPassword" id="new-password" type="password" required />
      </div>
      <button type="submit" :disabled="loading">Restablecer</button>
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
const code = ref('');
const newPassword = ref('');
const error = ref('');
const loading = ref(false);
const resetStep = ref(0); // 0: Login, 1: Request Reset, 2: Verify Code, 3: Reset Password
const router = useRouter();

async function handleLogin() {
  error.value = '';
  loading.value = true;
  try {
    console.log('API Endpoint: /login');
    console.log('Payload:', { email: email.value, password: password.value });
    const res = await axios.doPost('/login', { email: email.value, password: password.value });
    if (res.data && (res.data.token || res.data.access_token)) {
      localStorage.setItem('token', res.data.token || res.data.access_token);
      localStorage.setItem('role', 'admin'); // Simulate admin role for testing

      if ('admin' === 'admin') {
        router.push('/admin'); // Redirect admin users to admin dashboard
      } else {
        router.push('/'); // Redirect other users to home page
      }
    } else {
      error.value = 'Credenciales incorrectas';
    }
  } catch (e) {
    error.value = 'Usuario o contraseña incorrectos';
  } finally {
    loading.value = false;
  }
}

function startResetPassword() {
  resetStep.value = 1;
  error.value = '';
}

async function requestReset() {
  error.value = '';
  loading.value = true;
  try {
    console.log('API Endpoint: /request-reset');
    console.log('Payload:', { email: email.value });
    await axios.doPost('/request-reset', { email: email.value });
    resetStep.value = 2;
  } catch (e) {
    error.value = 'Error al enviar el código de verificación';
  } finally {
    loading.value = false;
  }
}

async function verifyCode() {
  error.value = '';
  loading.value = true;
  try {
    console.log('API Endpoint: /verify-code');
    console.log('Payload:', { email: email.value, code: code.value });
    await axios.doPost('/verify-code', { email: email.value, code: code.value });
    resetStep.value = 3;
  } catch (e) {
    error.value = 'Código de verificación incorrecto';
  } finally {
    loading.value = false;
  }
}

async function resetPassword() {
  error.value = '';
  loading.value = true;
  try {
    console.log('API Endpoint: /reset-password');
    console.log('Payload:', { email: email.value, code: code.value, new_password: newPassword.value });
    await axios.doPost('/reset-password', { email: email.value, code: code.value, new_password: newPassword.value });
    resetStep.value = 0;
    alert('Contraseña restablecida con éxito');
  } catch (e) {
    error.value = 'Error al restablecer la contraseña';
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

.reset-password-btn {
  background: none;
  border: none;
  color: #007bff;
  text-decoration: underline;
  cursor: pointer;
  margin-top: 1rem;
}

.reset-password-btn:hover {
  color: #0056b3;
}
</style>
