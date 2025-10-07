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
            <td :data-label="'Nombre'">{{ item.name }}</td>
            <td :data-label="'Precio'">${{ item.price }}</td>
            <td :data-label="'Categoría'">{{ item.category }}</td>
            <td :data-label="'Stock'">{{ item.stock }}</td>
            <td :data-label="'Marca'">{{ item.brand }}</td>
            <td :data-label="'Color'">{{ item.color }}</td>
            <td :data-label="'Material'">{{ item.material }}</td>
            <td :data-label="'Dimensiones'">{{ item.dimensions }}</td>
            <td :data-label="'Imagen'">
              <img v-if="item.img_base64" :src="item.img_base64" alt="img" style="max-width:60px;max-height:60px;" />
            </td>
            <td :data-label="'Acciones'">
              <button @click="openEditForm(item)">Editar</button>
              <button @click="deleteFurniture(item.id)" style="margin-left:0.5rem">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else>No hay muebles registrados.</div>
    </div>

    <div v-if="showForm" class="modal-form">
      <form @submit.prevent="saveFurniture">
        <h2>{{ isEditing ? 'Editar mueble' : 'Agregar nuevo mueble' }}</h2>
        <p class="form-instructions">Por favor, completa los campos a continuación para {{ isEditing ? 'editar' : 'agregar' }} un mueble.</p>

        <div class="form-grid">
          <div>
            <label for="name">Nombre del mueble</label>
            <input id="name" v-model="form.name" placeholder="Ejemplo: Silla de madera" required />

            <label for="price">Precio</label>
            <input id="price" v-model.number="form.price" type="number" placeholder="Ejemplo: 1500" required />

            <label for="category">Categoría</label>
            <select id="category" v-model="form.category" required>
              <option value="" disabled>Selecciona una categoría</option>
              <option v-for="cat in categories" :key="cat.value" :value="cat.value">
                {{ cat.label }}
              </option>
            </select>

            <label for="stock">Stock disponible</label>
            <input id="stock" v-model.number="form.stock" type="number" placeholder="Ejemplo: 10" />

            <label for="brand">Marca</label>
            <input id="brand" v-model="form.brand" placeholder="Ejemplo: IKEA" />
          </div>

          <div>
            <label for="color">Color</label>
            <input id="color" v-model="form.color" placeholder="Ejemplo: Blanco" />

            <label for="material">Material</label>
            <input id="material" v-model="form.material" placeholder="Ejemplo: Madera" />

            <label for="dimensions">Dimensiones</label>
            <input id="dimensions" v-model="form.dimensions" placeholder="Ejemplo: 120x60x80 cm" />

            <label for="description">Descripción</label>
            <textarea id="description" v-model="form.description" placeholder="Ejemplo: Una silla cómoda y resistente, ideal para oficinas."></textarea>

            <label for="image">Imagen</label>
            <input id="image" type="file" accept="image/*" @change="handleImageUpload" />
            <img v-if="form.img_base64" :src="form.img_base64" alt="Vista previa de la imagen" class="image-preview" />
          </div>
        </div>

        <div class="form-buttons">
          <button type="submit">Guardar</button>
          <button type="button" @click="showForm = false">Cancelar</button>
        </div>
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

const categories = [
  { label: "Sala", value: "sala" },
  { label: "Oficina", value: "oficina" },
  { label: "Camas y colchones", value: "camas-y-colchones" },
  { label: "Comedor", value: "comedor" },
  { label: "Cocinas", value: "cocinas" },
  { label: "Electrodomésticos pequeños", value: "electrodomesticos-pequenos" },
  { label: "Bicicletas", value: "bicicletas" },
  { label: "Refrigeradores", value: "refrigeradores" },
];

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

function validateForm() {
  if (!form.name.trim()) {
    alert('El nombre del mueble es obligatorio.');
    return false;
  }
  if (form.price <= 0) {
    alert('El precio debe ser mayor a 0.');
    return false;
  }
  if (!form.category.trim()) {
    alert('La categoría es obligatoria.');
    return false;
  }
  if (form.stock < 0) {
    alert('El stock no puede ser negativo.');
    return false;
  }
  return true;
}

async function saveFurniture() {
  if (!validateForm()) return;

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
  width: 100%;
  box-sizing: border-box;
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

/* Estilos para la tabla */
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
  background: #d32f2f; /* Cambiar a rojo */
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

@media (max-width: 900px) {
  .admin-dashboard {
    padding: 1.5rem 0.5rem;
  }
  table {
    font-size: 0.95rem;
    display: block;
    overflow-x: auto;
    white-space: nowrap;
    width: 100%;
    max-width: 100vw;
  }
}

@media (max-width: 700px) {
  .admin-dashboard {
    padding: 1rem 0.2rem;
    gap: 1rem;
  }
  .modal-form form {
    padding: 1rem;
    max-width: 98vw;
  }
  .modal-form .form-grid {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }
  table {
    font-size: 0.85rem;
  }
}

@media (max-width: 600px) {
  .admin-dashboard {
    padding: 0.5rem 0.1rem;
  }
  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
  }
  thead {
    display: none;
  }
  tr {
    margin-bottom: 1.2rem;
    border-bottom: 2px solid #eee;
  }
  td {
    position: relative;
    padding-left: 50%;
    min-height: 40px;
    border: none;
    border-bottom: 1px solid #eee;
  }
  td:before {
    position: absolute;
    left: 0.5rem;
    top: 0.8rem;
    width: 45%;
    white-space: nowrap;
    font-weight: bold;
    color: #d32f2f;
    content: attr(data-label);
  }
  .modal-form form {
    padding: 0.5rem;
    max-width: 100vw;
  }
}

/* Estilos para los botones */
button {
  background: linear-gradient(135deg, #d32f2f, #f44336); /* Cambiar a tonos rojos */
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
  box-shadow: 0 6px 20px rgba(211, 47, 47, 0.4); /* Cambiar a rojo */
}

button:disabled {
  background: #e57373; /* Cambiar a un tono rojo claro */
  cursor: not-allowed;
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
  max-width: 700px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.modal-form h2 {
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1.5rem;
}

.modal-form .form-instructions {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.modal-form .form-grid {
  display: grid;
  grid-template-columns: 1.2fr 1.2fr; /* Ajustar proporciones de las columnas */
  gap: 3rem; /* Incrementar aún más el espacio entre columnas */
}

.modal-form label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #444;
  display: block;
}

.modal-form input,
.modal-form textarea,
.modal-form select {
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #f9f9f9;
  color: #333;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.modal-form input:focus,
.modal-form textarea:focus,
.modal-form select:focus {
  border-color: #d32f2f; /* Cambiar a rojo */
  outline: none;
  box-shadow: 0 0 5px rgba(211, 47, 47, 0.5); /* Cambiar a rojo */
}

.modal-form .image-preview {
  max-width: 100px;
  max-height: 100px;
  margin-top: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.modal-form .form-buttons {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.modal-form button {
  background: linear-gradient(135deg, #d32f2f, #f44336); /* Cambiar a tonos rojos */
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.8rem;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.2s, box-shadow 0.2s;
}

.modal-form button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(211, 47, 47, 0.4); /* Cambiar a rojo */
}

.modal-form button:disabled {
  background: #e57373; /* Cambiar a un tono rojo claro */
  cursor: not-allowed;
}
</style>
