<template>
  <div class="admin-dashboard">
    <h1>Bienvenido al Dashboard de Admin</h1>
    <p>Aquí puedes gestionar productos, usuarios, pedidos, etc.</p>
    <button @click="logout">Cerrar sesión</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
function logout() {
  localStorage.removeItem('token');
  router.push('/login');
}
</script>

<style scoped>
.admin-dashboard {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}
h1 {
  color: #860734;
  margin-bottom: 1.2rem;
}
button {
  background: #860734;
  color: #fff;
  border: none;
  border-radius: 7px;
  padding: 0.7rem 2rem;
  font-size: 1.1rem;
  margin-top: 2rem;
  cursor: pointer;
  font-weight: 700;
}
button:hover {
  background: #ffd700;
  color: #860734;
}
</style>
