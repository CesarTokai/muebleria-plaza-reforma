<template>
  <div class="admin-dashboard">
    <h1>Bienvenido al Dashboard de Admin</h1>
    <p>Aquí puedes gestionar productos, usuarios, pedidos, etc.</p>
    <button @click="logout">Cerrar sesión</button>

    <div v-if="loading">Cargando muebles...</div>
    <div v-else>
      <button @click="openCreateForm" style="margin-bottom:1rem">Agregar mueble</button>
      <table v-if="furnitureList.length" border="1" style="width:100%;margin-bottom:2rem">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Stock</th>
            <th>Marca</th>
            <th>Color</th>
            <th>Material</th>
            <th>Dimensiones</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in furnitureList" :key="item.id">
            <td>{{ item.name }}</td>
            <td>${{ item.price }}</td>
            <td>{{ item.category }}</td>
            <td>{{ item.stock }}</td>
            <td>{{ item.brand }}</td>
            <td>{{ item.color }}</td>
            <td>{{ item.material }}</td>
            <td>{{ item.dimensions }}</td>
            <td>
              <img v-if="item.img_base64" :src="item.img_base64" alt="img" style="max-width:60px;max-height:60px;" />
            </td>
            <td>
              <button @click="openEditForm(item)">Editar</button>
              <button @click="deleteFurniture(item.id)" style="margin-left:0.5rem">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else>No hay muebles registrados.</div>
    </div>

    <div v-if="showForm" class="modal-form">
      <h2>{{ isEditing ? 'Editar' : 'Agregar' }} mueble</h2>
      <form @submit.prevent="saveFurniture">
        <input v-model="form.name" placeholder="Nombre" required />
        <input v-model.number="form.price" type="number" placeholder="Precio" required />
        <input v-model="form.category" placeholder="Categoría" required />
        <input v-model.number="form.stock" type="number" placeholder="Stock" />
        <input v-model="form.brand" placeholder="Marca" />
        <input v-model="form.color" placeholder="Color" />
        <input v-model="form.material" placeholder="Material" />
        <input v-model="form.dimensions" placeholder="Dimensiones" />
        <textarea v-model="form.description" placeholder="Descripción"></textarea>
        <div style="margin:0.5rem 0">
          <label>Imagen:</label>
          <input type="file" accept="image/*" @change="handleImageUpload" />
          <img v-if="form.img_base64" :src="form.img_base64" alt="preview" style="max-width:80px;max-height:80px;display:block;margin-top:0.5rem" />
        </div>
        <button type="submit">Guardar</button>
        <button type="button" @click="showForm=false" style="margin-left:0.5rem">Cancelar</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import axiosConfig from '../config/AxiosConfig.js';
import { ref, reactive, onMounted } from 'vue';

const router = useRouter();
const furnitureList = ref([]);
const loading = ref(false);
const error = ref('');
const showForm = ref(false);
const isEditing = ref(false);
const form = reactive({
  id: null,
  name: '',
  description: '',
  price: 0,
  category: '',
  img_base64: '',
  stock: 0,
  brand: '',
  color: '',
  material: '',
  dimensions: ''
});

function logout() {
  localStorage.removeItem('token');
  router.push('/login');
}

async function fetchFurniture() {
  loading.value = true;
  try {
    const res = await axiosConfig.doGet('/furniture/');
    furnitureList.value = res.data;
  } catch (e) {
    error.value = 'Error al cargar muebles';
  } finally {
    loading.value = false;
  }
}

function openCreateForm() {
  isEditing.value = false;
  Object.assign(form, {
    id: null,
    name: '',
    description: '',
    price: 0,
    category: '',
    img_base64: '',
    stock: 0,
    brand: '',
    color: '',
    material: '',
    dimensions: ''
  });
  showForm.value = true;
}

function openEditForm(item) {
  isEditing.value = true;
  Object.assign(form, item);
  showForm.value = true;
}

async function saveFurniture() {
  try {
    if (isEditing.value) {
      await axiosConfig.doPut(`/furniture/${form.id}`, form);
    } else {
      await axiosConfig.doPost('/furniture/', form);
    }
    showForm.value = false;
    fetchFurniture();
  } catch (e) {
    // Error handled by interceptor
  }
}

async function deleteFurniture(id) {
  if (!confirm('¿Seguro que deseas eliminar este mueble?')) return;
  try {
    await axiosConfig.doDelete(`/furniture/${id}`);
    fetchFurniture();
  } catch (e) {}
}

function handleImageUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    form.img_base64 = ev.target.result;
  };
  reader.readAsDataURL(file);
}

onMounted(fetchFurniture);
</script>

<style scoped>
.admin-dashboard {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 3rem 2rem;
  background: linear-gradient(135deg, #f3e7e9, #e3eeff);
  animation: gradient-animation 6s ease infinite;
  gap: 2rem;
}

@keyframes gradient-animation {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

h1 {
  color: #4a4a4a;
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
}

p {
  color: #6a6a6a;
  font-size: 1.3rem;
  margin-bottom: 2.5rem;
  text-align: center;
  max-width: 800px;
}

button {
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.9rem 2rem;
  font-size: 1.2rem;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.2s, box-shadow 0.2s;
  margin-bottom: 1.5rem;
}

button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(106, 17, 203, 0.4);
}

button:disabled {
  background: #bfa2b7;
  cursor: not-allowed;
}

table {
  width: 100%;
  max-width: 1200px;
  border-collapse: collapse;
  margin: 2rem 0;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: left;
}

thead {
  background: #6a11cb;
  color: #fff;
}

td, th {
  padding: 1.2rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

tbody tr:hover {
  background: #f9f9f9;
}

.modal-form {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.modal-form form {
  background: #fff;
  padding: 2.5rem;
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.modal-form h2 {
  color: #4a4a4a;
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.8rem;
}

.modal-form input,
.modal-form textarea {
  width: 100%;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}

.modal-form button {
  width: 100%;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 1rem;
  font-size: 1.2rem;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.2s, box-shadow 0.2s;
}

.modal-form button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(106, 17, 203, 0.4);
}
</style>
