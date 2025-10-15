<template>
  <div class="admin-dashboard">
    <!-- Header del Dashboard -->
    <div class="dashboard-header">
      <div class="header-content">
        <div class="header-title-section">
          <i class="bi bi-speedometer2"></i>
          <div>
            <h1>Panel de Administración</h1>
            <p>Gestiona tu inventario de muebles</p>
          </div>
        </div>
        <button @click="logout" class="logout-btn">
          <i class="bi bi-box-arrow-right"></i>
          Cerrar sesión
        </button>
      </div>
    </div>

    <!-- Contenedor principal -->
    <div class="dashboard-content">
      <!-- Loading state -->
      <div v-if="loading" class="loading-container">
        <div class="spinner"></div>
        <p>Cargando muebles...</p>
      </div>

      <!-- Content cuando no está cargando -->
      <div v-else class="content-wrapper">
        <!-- Barra de acciones -->
        <div class="actions-bar"style="margin-top: 2rem;">
          <button @click="openCreateForm" class="btn-primary">
            <i class="bi bi-plus-circle"></i>
            Agregar Mueble
          </button>
          <div class="stats-summary">
            <div class="stat-item">
              <i class="bi bi-box-seam"></i>
              <span>{{ furnitureList.length }} productos</span>
            </div>
          </div>
        </div>

        <!-- Tabla de productos -->
        <div v-if="furnitureList.length" class="table-container">
          <table class="furniture-table">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Categoría</th>
                <th>Stock</th>
                <th>Marca</th>
                <th>Color</th>
                <th>Material</th>
                <th>Dimensiones</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in furnitureList" :key="item.id" class="table-row">
                <td data-label="Imagen" class="img-cell">
                  <div class="img-wrapper">
                    <img v-if="item.img_base64" :src="item.img_base64" alt="img" />
                    <div v-else class="no-image">
                      <i class="bi bi-image"></i>
                    </div>
                  </div>
                </td>
                <td data-label="Nombre" class="name-cell">{{ item.name }}</td>
                <td data-label="Precio" class="price-cell">${{ item.price.toLocaleString('es-MX') }}</td>
                <td data-label="Categoría">
                  <span class="category-badge">{{ getCategoryLabel(item.category) }}</span>
                </td>
                <td data-label="Stock">
                  <span :class="['stock-badge', getStockClass(item.stock)]">
                    {{ item.stock }}
                  </span>
                </td>
                <td data-label="Marca">{{ item.brand || '-' }}</td>
                <td data-label="Color">
                  <span class="color-dot" :style="{ background: item.color || '#ccc' }"></span>
                  {{ item.color || '-' }}
                </td>
                <td data-label="Material">{{ item.material || '-' }}</td>
                <td data-label="Dimensiones">{{ item.dimensions || '-' }}</td>
                <td data-label="Acciones" class="actions-cell">
                  <button @click="openEditForm(item)" class="btn-icon btn-edit" title="Editar">
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button @click="deleteFurniture(item.id)" class="btn-icon btn-delete" title="Eliminar">
                    <i class="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Estado vacío -->
        <div v-else class="empty-state">
          <i class="bi bi-inbox"></i>
          <h3>No hay muebles registrados</h3>
          <p>Comienza agregando tu primer producto</p>
          <button @click="openCreateForm" class="btn-primary">
            <i class="bi bi-plus-circle"></i>
            Agregar Mueble
          </button>
        </div>
      </div>
    </div>

    <!-- Modal del formulario -->
    <Transition name="modal">
      <div v-if="showForm" class="modal-overlay" @click.self="showForm = false">
        <div class="modal-form">
          <form @submit.prevent="saveFurniture">
            <div class="form-header">
              <h2>
                <i :class="isEditing ? 'bi bi-pencil-square' : 'bi bi-plus-square'"></i>
                {{ isEditing ? 'Editar Mueble' : 'Nuevo Mueble' }}
              </h2>
              <button type="button" @click="showForm = false" class="close-btn">
                <i class="bi bi-x-lg"></i>
              </button>
            </div>

            <div class="form-body">
              <div class="form-grid">
                <!-- Columna izquierda -->
                <div class="form-column">
                  <div class="form-group">
                    <label for="name">
                      <i class="bi bi-card-heading"></i>
                      Nombre del mueble *
                    </label>
                    <input id="name" v-model="form.name" placeholder="Ej: Silla ergonómica" required />
                  </div>

                  <div class="form-group">
                    <label for="price">
                      <i class="bi bi-currency-dollar"></i>
                      Precio *
                    </label>
                    <input id="price" v-model.number="form.price" type="number" placeholder="1500" required />
                  </div>

                  <div class="form-group">
                    <label for="category">
                      <i class="bi bi-tags"></i>
                      Categoría *
                    </label>
                    <select id="category" v-model="form.category_id" required>
                      <option :value="null" disabled>Selecciona una categoría</option>
                      <option v-for="cat in categories" :key="cat.value" :value="cat.value">
                        {{ cat.label }}
                      </option>
                    </select>
                  </div>

                  <div class="form-row">
                    <div class="form-group">
                      <label for="stock">
                        <i class="bi bi-box"></i>
                        Stock
                      </label>
                      <input id="stock" v-model.number="form.stock" type="number" placeholder="10" />
                    </div>

                    <div class="form-group">
                      <label for="brand">
                        <i class="bi bi-award"></i>
                        Marca
                      </label>
                      <input id="brand" v-model="form.brand" placeholder="IKEA" />
                    </div>
                  </div>
                </div>

                <!-- Columna derecha -->
                <div class="form-column">
                  <div class="form-row">
                    <div class="form-group">
                      <label for="color">
                        <i class="bi bi-palette"></i>
                        Color
                      </label>
                      <input id="color" v-model="form.color" placeholder="Blanco" />
                    </div>

                    <div class="form-group">
                      <label for="material">
                        <i class="bi bi-tree"></i>
                        Material
                      </label>
                      <input id="material" v-model="form.material" placeholder="Madera" />
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="dimensions">
                      <i class="bi bi-rulers"></i>
                      Dimensiones
                    </label>
                    <input id="dimensions" v-model="form.dimensions" placeholder="120x60x80 cm" />
                  </div>

                  <div class="form-group">
                    <label for="description">
                      <i class="bi bi-text-paragraph"></i>
                      Descripción
                    </label>
                    <textarea id="description" v-model="form.description" placeholder="Describe las características del mueble..." rows="3"></textarea>
                  </div>

                  <div class="form-group">
                    <label for="image">
                      <i class="bi bi-image"></i>
                      Imagen del producto
                    </label>
                    <div class="image-upload-wrapper">
                      <input id="image" type="file" accept="image/*" @change="handleImageUpload" class="file-input" />
                      <label for="image" class="file-label">
                        <i class="bi bi-cloud-upload"></i>
                        <span>{{ form.img_base64 ? 'Cambiar imagen' : 'Subir imagen' }}</span>
                      </label>
                      <img v-if="form.img_base64" :src="form.img_base64" alt="Preview" class="image-preview" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="form-footer">
              <button type="button" @click="showForm = false" class="btn-secondary">
                <i class="bi bi-x-circle"></i>
                Cancelar
              </button>
              <button type="submit" class="btn-primary">
                <i class="bi bi-check-circle"></i>
                {{ isEditing ? 'Guardar Cambios' : 'Crear Mueble' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
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
  category_id: null,
  img_base64: '',
  stock: 0,
  brand: '',
  color: '',
  material: '',
  dimensions: ''
});

const categories = [
  { label: "Sala", value: 1 },
  { label: "Comedor", value: 2 },
  { label: "Cocinas", value: 3 },
  { label: "Oficina", value: 4 },
  { label: "Camas y colchones", value: 5 },
  { label: "Electrodomésticos pequeños", value: 6 },
  { label: "Bicicletas", value: 7 },
  { label: "Refrigeradores", value: 8 },
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
    category_id: null,
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
  Object.assign(form, {
    ...item,
    category_id: item.category_id || item.category
  });
  showForm.value = true;
}

function validateForm() {
  if (!form.name.trim()) {
    axiosConfig.ToastWarning('Validación', 'El nombre del mueble es obligatorio.');
    return false;
  }
  if (form.price <= 0) {
    axiosConfig.ToastWarning('Validación', 'El precio debe ser mayor a 0.');
    return false;
  }
  if (!form.category_id) {
    axiosConfig.ToastWarning('Validación', 'La categoría es obligatoria.');
    return false;
  }
  if (form.stock < 0) {
    axiosConfig.ToastWarning('Validación', 'El stock no puede ser negativo.');
    return false;
  }
  return true;
}

async function saveFurniture() {
  if (!validateForm()) return;

  // Preparar los datos para enviar
  const dataToSend = {
    name: form.name,
    description: form.description || '',
    price: parseFloat(form.price),
    category_id: parseInt(form.category_id),
    img_base64: form.img_base64 || '',
    stock: parseInt(form.stock) || 0,
    brand: form.brand || '',
    color: form.color || '',
    material: form.material || '',
    dimensions: form.dimensions || ''
  };

  try {
    if (isEditing.value) {
      await axiosConfig.doPut(`/furniture/${form.id}/`, dataToSend);
      axiosConfig.ToastSuccess('¡Éxito!', 'Mueble actualizado correctamente.');
    } else {
      await axiosConfig.doPost('/furniture/', dataToSend);
      axiosConfig.ToastSuccess('¡Éxito!', 'Mueble creado correctamente.');
    }
    showForm.value = false;
    fetchFurniture();
  } catch (e) {
    console.error('Error al guardar:', e);
  }
}

async function deleteFurniture(id) {
  if (!confirm('¿Seguro que deseas eliminar este mueble?')) return;
  try {
    await axiosConfig.doDelete(`/furniture/${id}/`);
    axiosConfig.ToastSuccess('¡Éxito!', 'Mueble eliminado correctamente.');
    fetchFurniture();
  } catch (e) {
    console.error('Error al eliminar:', e);
  }
}

function handleImageUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  // Validar tamaño (máximo 5MB)
  if (file.size > 5 * 1024 * 1024) {
    axiosConfig.ToastWarning('Imagen muy grande', 'La imagen no debe superar los 5MB.');
    return;
  }

  const reader = new FileReader();
  reader.onload = (ev) => {
    form.img_base64 = ev.target.result;
  };
  reader.readAsDataURL(file);
}

onMounted(fetchFurniture);

function getCategoryLabel(value) {
  const cat = categories.find(c => c.value === value);
  return cat ? cat.label : value;
}

function getStockClass(stock) {
  if (stock === 0) return 'out-of-stock';
  if (stock < 5) return 'low-stock';
  return 'in-stock';
}
</script>

<style scoped>
/* Las variables CSS globales se definen en src/components/assets/styles.css */

.admin-dashboard {
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f4f8 0%, #e9ecef 100%);
}

/* Header del Dashboard - MEJORADO Y RESPONSIVO */
.dashboard-header {
  background: linear-gradient(135deg, var(--primary), var(--primary-light));
  color: white;
  padding: 1.5rem 1rem 2.5rem;
  box-shadow: var(--shadow-lg);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.header-title-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
  min-width: 200px;
}

.header-title-section i {
  font-size: 2.5rem;
  opacity: 0.9;
}

.header-title-section h1 {
  margin: 0;
  font-size: clamp(1.3rem, 4vw, 2rem);
  font-weight: 700;
  color: white;
}

.header-title-section p {
  margin: 0.3rem 0 0;
  font-size: clamp(0.85rem, 2.5vw, 1rem);
  opacity: 0.9;
  color: white;
}

.logout-btn {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s;
  cursor: pointer;
  white-space: nowrap;
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

/* Contenido del Dashboard - MEJORADO */
.dashboard-content {
  max-width: 1400px;
  margin: -2rem auto 2rem;
  padding: 0 1rem;
}

.content-wrapper {
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Barra de acciones - MEJORADA Y RESPONSIVA */
.actions-bar {
  background: var(--bg-white);
  padding: 2.25rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  gap: 2rem;
  flex-wrap: wrap;
}

.stats-summary {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-gray);
  font-weight: 600;
  font-size: 0.95rem;
}

.stat-item i {
  font-size: 1.25rem;
  color: var(--primary);
}

/* Botones - MEJORADOS */
.btn-primary {
  background: linear-gradient(135deg, var(--primary), var(--primary-light));
  color: white;
  border: none;
  padding: 0.875rem 1.5rem;
  border-radius: var(--radius);
  font-weight: 600;
  font-size: 0.95rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: var(--shadow);
  white-space: nowrap;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-secondary {
  background: var(--bg-light);
  color: var(--text-dark);
  border: 1px solid var(--border);
  padding: 0.875rem 1.5rem;
  border-radius: var(--radius);
  font-weight: 600;
  font-size: 0.95rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-secondary:hover {
  background: #e5e7eb;
}

.btn-icon {
  background: transparent;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 1.1rem;
  padding: 0;
}

.btn-edit {
  color: #3b82f6;
}

.btn-edit:hover {
  background: #eff6ff;
}

.btn-delete {
  color: var(--danger);
}

.btn-delete:hover {
  background: #fef2f2;
}

/* Tabla - COMPLETAMENTE REDISEÑADA PARA MÓVILES */
.table-container {
  background: var(--bg-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
  overflow: hidden;
}

.furniture-table {
  width: 100%;
  border-collapse: collapse;
}

.furniture-table thead {
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: white;
}

.furniture-table th {
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.furniture-table tbody tr {
  border-bottom: 1px solid var(--border);
  transition: background 0.2s;
}

.furniture-table tbody tr:hover {
  background: var(--bg-light);
}

.furniture-table td {
  padding: 1rem;
  color: var(--text-dark);
}

.img-cell {
  width: 80px;
}

.img-wrapper {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.img-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.no-image {
  width: 100%;
  height: 100%;
  background: var(--bg-light);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-gray);
  font-size: 1.5rem;
}

.name-cell {
  font-weight: 600;
  color: var(--text-dark);
  max-width: 200px;
}

.price-cell {
  font-weight: 700;
  color: var(--primary);
  white-space: nowrap;
}

.category-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: #e0e7ff;
  color: #4f46e5;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
}

.stock-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 50px;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.875rem;
}

.in-stock {
  background: #d1fae5;
  color: #065f46;
}

.low-stock {
  background: #fef3c7;
  color: #92400e;
}

.out-of-stock {
  background: #fee2e2;
  color: #991b1b;
}

.color-dot {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 0 0 1px var(--border);
  vertical-align: middle;
  margin-right: 0.25rem;
}

.actions-cell {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

/* Loading */
.loading-container {
  background: var(--bg-white);
  border-radius: var(--radius-lg);
  padding: 4rem 2rem;
  text-align: center;
  box-shadow: var(--shadow);
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid var(--border);
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Empty State */
.empty-state {
  background: var(--bg-white);
  border-radius: var(--radius-lg);
  padding: 3rem 1.5rem;
  text-align: center;
  box-shadow: var(--shadow);
}

.empty-state i {
  font-size: 4rem;
  color: var(--text-gray);
  opacity: 0.5;
  margin-bottom: 1rem;
}

.empty-state h3 {
  color: var(--text-dark);
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}

.empty-state p {
  color: var(--text-gray);
  margin-bottom: 2rem;
}

/* Modal - MEJORADO PARA MÓVILES */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6) !important;
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
  overflow-y: auto;
}

.modal-form {
  background: var(--bg-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  z-index: 10000;
}

.form-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background: var(--bg-white);
  z-index: 10;
}

.form-header h2 {
  margin: 0;
  font-size: clamp(1.2rem, 4vw, 1.5rem);
  color: var(--text-dark);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.close-btn {
  background: transparent;
  border: none;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s;
  color: var(--text-gray);
  font-size: 1.2rem;
}

.close-btn:hover {
  background: var(--bg-light);
  color: var(--text-dark);
}

.form-body {
  padding: 1.5rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.form-column {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: var(--text-dark);
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.form-group label i {
  color: var(--primary);
  font-size: 1rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 0.75rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  font-size: 1rem;
  transition: all 0.2s;
  font-family: inherit;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(134, 7, 52, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
}

.image-upload-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.file-input {
  display: none;
}


.file-label {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--bg-light);
  border: 2px dashed var(--border);
  border-radius: var(--radius);
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 600;
  color: var(--text-gray);
}

.file-label:hover {
  background: #e5e7eb;
  border-color: var(--primary);
  color: var(--primary);
}

.image-preview {
  width: 100%;
  max-height: 200px;
  object-fit: contain;
  border-radius: var(--radius);
  border: 1px solid var(--border);
}

.form-footer {
  padding: 1.5rem;
  border-top: 1px solid var(--border);
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  position: sticky;
  bottom: 0;
  background: var(--bg-white);
  flex-wrap: wrap;
}

/* Animaciones del modal */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s;
}

.modal-enter-active .modal-form,
.modal-leave-active .modal-form {
  transition: transform 0.3s;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-form,
.modal-leave-to .modal-form {
  transform: scale(0.95);
}

/* RESPONSIVE - TABLET */
@media (max-width: 1024px) {
  .dashboard-content {
    padding: 0 0.75rem;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .furniture-table {
    font-size: 0.9rem;
  }

  .furniture-table th,
  .furniture-table td {
    padding: 0.75rem 0.5rem;
  }
}

/* RESPONSIVE - MÓVIL */
@media (max-width: 768px) {
  .dashboard-header {
    padding: 1rem 0.75rem 2rem;
  }

  .header-content {
    flex-direction: column;
    align-items: stretch;
  }

  .header-title-section {
    justify-content: center;
    text-align: center;
  }

  .header-title-section i {
    font-size: 2rem;
  }

  .logout-btn {
    width: 100%;
    justify-content: center;
  }

  .actions-bar {
    flex-direction: column;
    align-items: stretch;
    padding: 1rem;
  }

  .btn-primary {
    width: 100%;
  }

  .stats-summary {
    justify-content: center;
  }

  /* TABLA RESPONSIVA TIPO TARJETAS - MEJORADA */
  .table-container {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    border-radius: var(--radius-lg);
  }

  .furniture-table {
    display: block;
  }

  .furniture-table thead {
    display: none;
  }

  .furniture-table tbody {
    display: block;
  }

  .table-row {
    display: block;
    margin-bottom: 1.25rem;
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 1.25rem;
    background: var(--bg-white);
    box-shadow: 0 4px 15px rgba(134, 7, 52, 0.08);
    transition: all 0.3s;
  }

  .table-row:hover {
    box-shadow: 0 8px 25px rgba(134, 7, 52, 0.15);
    transform: translateY(-2px);
  }

  .furniture-table td {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.875rem 0;
    border-bottom: 1px solid var(--bg-light);
  }

  .furniture-table td:last-child {
    border-bottom: none;
    padding-top: 1.25rem;
    border-top: 2px solid var(--bg-light);
    margin-top: 0.5rem;
  }

  .furniture-table td::before {
    content: attr(data-label);
    font-weight: 700;
    color: var(--primary);
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    flex-shrink: 0;
  }

  .img-cell::before {
    content: 'Imagen';
  }

  .name-cell::before {
    content: 'Nombre';
  }

  .price-cell::before {
    content: 'Precio';
  }

  .img-cell,
  .name-cell {
    max-width: 100%;
  }

  .img-wrapper {
    width: 80px;
    height: 80px;
    border-radius: 12px;
  }

  .actions-cell {
    justify-content: flex-end;
  }

  .actions-cell::before {
    display: none;
  }

  /* MODAL EN MÓVIL - MEJORADO */
  .modal-overlay {
    padding: 0;
    align-items: flex-end;
  }

  .modal-form {
    max-height: 95vh;
    border-radius: 24px 24px 0 0;
    margin-top: auto;
    animation: slideUp 0.3s ease;
  }

  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }

  .form-body {
    padding: 1rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .form-footer {
    flex-direction: column-reverse;
    padding: 1rem;
  }

  .form-footer .btn-primary,
  .form-footer .btn-secondary {
    width: 100%;
  }
}

/* RESPONSIVE - MÓVIL PEQUEÑO */
@media (max-width: 480px) {
  .dashboard-header {
    padding: 0.75rem 0.5rem 1.5rem;
  }

  .header-title-section h1 {
    font-size: 1.2rem;
  }

  .header-title-section p {
    font-size: 0.8rem;
  }

  .btn-primary,
  .btn-secondary {
    font-size: 0.9rem;
    padding: 0.75rem 1.25rem;
  }

  .empty-state {
    padding: 2rem 1rem;
  }

  .empty-state i {
    font-size: 3rem;
  }

  .empty-state h3 {
    font-size: 1.25rem;
  }

  .form-header {
    padding: 1rem;
  }

  .form-header h2 {
    font-size: 1.1rem;
  }

  .close-btn {
    width: 36px;
    height: 36px;
  }
}

/* Mejoras de accesibilidad y UX */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Modo oscuro (opcional) */
@media (prefers-color-scheme: dark) {
  .admin-dashboard {
    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  }
}
</style>
