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
        <div class="actions-bar">
          <div class="actions-left">
            <button @click="openCreateForm" class="btn-primary">
              <i class="bi bi-plus-circle"></i>
              Agregar Mueble
            </button>
            <button @click="openCreateCategory" class="btn-secondary" style="margin-left:0.75rem">
              <i class="bi bi-tags"></i>
              Nueva Categoría
            </button>
          </div>
          <div class="stats-summary">
            <div class="stat-item">
              <i class="bi bi-box-seam"></i>
              <span>{{ furnitureList.length }} productos</span>
            </div>
          </div>
        </div>

        <!-- Sección de categorías integrada -->
        <div class="categories-section">
          <div class="section-header">
            <h2>Categorías</h2>
            <p class="muted">Gestiona las categorías disponibles en el catálogo</p>
          </div>

          <div v-if="categories.length" class="categories-grid">
            <div v-for="cat in categories" :key="cat.id" class="category-card-mini">
              <div class="cat-left">
                <div class="icon-area-small">
                  <div class="no-icon-small"><i class="bi bi-tags"></i></div>
                </div>
              </div>
              <div class="cat-mid">
                <strong class="cat-name">{{ cat.name }}</strong>
                <div class="muted small">{{ cat.description || '-' }}</div>
              </div>
              <div class="cat-actions">
                <button class="btn-icon" @click="openEditCategory(cat)"><i class="bi bi-pencil"></i></button>
                <button class="btn-icon btn-delete" @click="confirmDeleteCategory(cat)"><i class="bi bi-trash"></i></button>
              </div>
            </div>
          </div>

          <div v-else class="empty-state small">
            <i class="bi bi-inbox"></i>
            <h4>No hay categorías</h4>
            <p>Añade categorías para organizar tus muebles</p>
            <button class="btn-primary" @click="openCreateCategory">Crear Categoría</button>
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
                    <img v-if="getMainImage(item)" :src="getMainImage(item)" alt="img" />
                    <div v-else class="no-image">
                      <i class="bi bi-image"></i>
                    </div>
                  </div>
                </td>
                <td data-label="Nombre" class="name-cell">{{ item.name }}</td>
                <td data-label="Precio" class="price-cell">${{ item.price.toLocaleString('es-MX') }}</td>
                <td data-label="Categoría">
                  <span class="category-badge">{{ getCategoryLabel(item.category_id || item.category) }}</span>
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

    <!-- Modal del formulario (Mueble) -->
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
                    <div class="category-select-controls">
                      <select id="category" v-model="form.category_id" required>
                        <option :value="null" disabled>Selecciona una categoría</option>
                        <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                          {{ cat.name }}
                        </option>
                      </select>
                      <button type="button" class="btn-icon small" title="Crear categoría" @click="openCreateCategory">
                        <i class="bi bi-plus-lg"></i>
                      </button>
                    </div>
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

                  <div class="form-section-images">
                    <h3>
                      <i class="bi bi-images"></i>
                      Galería de imágenes
                    </h3>
                    <div class="images-count">
                      {{ form.images.length }} / {{ maxImages }} imágenes
                    </div>

                    <div class="image-uploader">
                      <div class="image-drop-area" @click="fileInputRef.click()" @dragover="handleDragOver" @drop.prevent="handleDrop">
                        <i class="bi bi-cloud-upload"></i>
                        <p>Arrastra y suelta imágenes aquí o</p>
                        <button type="button" class="browse-text" @click="fileInputRef.click()">
                          Selecciona archivos
                        </button>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          ref="fileInputRef"
                          class="hidden-file-input"
                          @change="handleImageUpload"
                        />
                      </div>

                      <div v-if="form.images.length" class="image-list">
                        <div v-for="(img, index) in form.images" :key="index" class="image-item">
                          <div class="image-preview-box">
                            <img :src="img" alt="Imagen del mueble" />
                            <div class="image-actions">
                              <button type="button" class="btn-icon remove-btn" @click="removeImage(index)">
                                <i class="bi bi-x-circle"></i>
                              </button>
                              <button type="button" class="btn-icon main-btn" @click="setAsMainImage(index)" v-if="!isEditing">
                                <i class="bi bi-star"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div v-if="imageErrors.length" class="error-messages">
                        <div v-for="(error, index) in imageErrors" :key="index" class="error-message">
                          <i class="bi bi-exclamation-circle"></i>
                          {{ error }}
                        </div>
                      </div>
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

    <!-- Modal del formulario (Categoría) -->
    <Transition name="modal">
      <div v-if="showCategoryForm" class="modal-overlay" @click.self="showCategoryForm = false">
        <div class="modal-card">
          <form @submit.prevent="saveCategory">
            <div class="modal-header">
              <h2>{{ isEditingCategory ? 'Editar categoría' : 'Crear categoría' }}</h2>
              <button type="button" class="close" @click="showCategoryForm = false"><i class="bi bi-x-lg"></i></button>
            </div>

            <div class="modal-body">
              <div class="form-group">
                <label>Nombre *</label>
                <input v-model="categoryForm.name" required />
              </div>

              <div class="form-group">
                <label>Descripción</label>
                <textarea v-model="categoryForm.description" rows="3"></textarea>
              </div>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn-secondary" @click="showCategoryForm = false">Cancelar</button>
              <button type="submit" class="btn-primary">{{ isEditingCategory ? 'Guardar' : 'Crear' }}</button>
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
import * as categoriesService from '../services/categories';

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
  images: [], // Array de imágenes en base64
  stock: 0,
  brand: '',
  color: '',
  material: '',
  dimensions: ''
});
const maxImages = 5;
const maxFileSizeMB = 5;
const imageErrors = ref([]);
const fileInputRef = ref(null);

const categories = ref([]);

// --- NUEVO: estados y formulario para categorías integradas ---
const showCategoryForm = ref(false);
const isEditingCategory = ref(false);
// Removed icon_base64 from categoryForm
const categoryForm = reactive({ id: null, name: '', description: '' });

async function fetchCategories() {
  try {
    categories.value = await categoriesService.getCategories();
  } catch (e) {
    console.error('Error cargando categorías:', e);
  }
}

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

async function openCreateForm() {
  isEditing.value = false;
  // Ensure categories are up-to-date before opening the form
  await fetchCategories();
  Object.assign(form, {
    id: null,
    name: '',
    description: '',
    price: 0,
    category_id: null,
    images: [],
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
  // Normalizar category: si el item trae un objeto category, usar su id
  const catId = item.category_id || (item.category && (item.category.id || item.category));

  // Normalizar imágenes: convertir a array
  let itemImages = [];
  if (item.images && Array.isArray(item.images) && item.images.length > 0) {
    itemImages = item.images.map(img => (typeof img === 'string' ? img : (img.img_base64 || img.url || img))).filter(Boolean);
  } else if (item.img_base64) {
    itemImages = [item.img_base64];
  }

  Object.assign(form, {
    ...item,
    category_id: catId,
    images: itemImages
  });
  imageErrors.value = [];
  showForm.value = true;
}

// --- NUEVO: funciones para CRUD de categorías dentro del dashboard ---
function openCreateCategory() {
  isEditingCategory.value = false;
  Object.assign(categoryForm, { id: null, name: '', description: '' });
  showCategoryForm.value = true;
}

function openEditCategory(cat) {
  isEditingCategory.value = true;
  // removed icon_base64 handling
  Object.assign(categoryForm, { id: cat.id, name: cat.name, description: cat.description || '' });
  showCategoryForm.value = true;
}

async function saveCategory() {
  if (!categoryForm.name || !categoryForm.name.trim()) {
    axiosConfig.ToastWarning('Validación', 'El nombre es obligatorio');
    return;
  }
  // payload no longer includes icon_base64
  const payload = { name: categoryForm.name.trim(), description: categoryForm.description || undefined };
  try {
    if (isEditingCategory.value) {
      const updated = await categoriesService.updateCategory(categoryForm.id, payload);
      axiosConfig.ToastSuccess('Actualizado', 'Categoría actualizada correctamente');
      // refresh categories and keep selection if needed
      await fetchCategories();
      if (updated && updated.id) {
        if (form.category_id === updated.id || !form.category_id) form.category_id = updated.id;
      }
    } else {
      const created = await categoriesService.createCategory(payload);
      axiosConfig.ToastSuccess('Creado', 'Categoría creada correctamente');
      // refrescar lista de categorías y asignar la nueva al formulario del mueble
      await fetchCategories();
      if (created && created.id) {
        form.category_id = created.id;
      }
    }
    showCategoryForm.value = false;
  } catch (err) {
    console.error(err);
    if (err.response && err.response.status === 409) {
      axiosConfig.ToastWarning('Conflicto', 'Ya existe una categoría con ese nombre');
    } else if (err.response && err.response.data) {
      axiosConfig.ToastWarning('Error', JSON.stringify(err.response.data));
    } else {
      axiosConfig.ToastError('Error', 'No se pudo guardar la categoría');
    }
  }
}

function confirmDeleteCategory(cat) {
  if (!confirm(`¿Eliminar la categoría "${cat.name}"?`)) return;
  deleteCategoryRequest(cat.id);
}

async function deleteCategoryRequest(id) {
  try {
    await categoriesService.deleteCategory(id);
    axiosConfig.ToastSuccess('Eliminado', 'Categoría eliminada correctamente');
    fetchCategories();
  } catch (err) {
    console.error(err);
    if (err.response && err.response.status === 400) {
      axiosConfig.ToastWarning('No se puede eliminar', 'La categoría tiene muebles asociados');
    } else {
      axiosConfig.ToastError('Error', 'No se pudo eliminar la categoría');
    }
  }
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
  // Ensure selected category exists in the loaded categories
  const selId = Number(form.category_id);
  const exists = categories.value.some(c => Number(c.id) === selId);
  if (!exists) {
    axiosConfig.ToastWarning('Validación', 'La categoría seleccionada no es válida. Selecciona una categoría existente.');
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
    images: form.images || [], // Enviar array de imágenes
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
    axiosConfig.ToastError('Error', 'No se pudo guardar el mueble.');
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
  const files = e.target.files;
  if (!files.length) return;

  // Validar cantidad de imágenes
  if (form.images.length + files.length > maxImages) {
    axiosConfig.ToastWarning('Límite de imágenes', `Solo se permiten hasta ${maxImages} imágenes.`);
    return;
  }

  imageErrors.value = [];

  Array.from(files).forEach(file => {
    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      imageErrors.value.push(`${file.name} no es una imagen válida.`);
      return;
    }

    // Validar tamaño (máximo 5MB)
    if (file.size > maxFileSizeMB * 1024 * 1024) {
      imageErrors.value.push(`${file.name} supera el tamaño máximo de ${maxFileSizeMB}MB.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      form.images.push(ev.target.result);
    };
    reader.onerror = () => {
      imageErrors.value.push(`Error al leer ${file.name}.`);
    };
    reader.readAsDataURL(file);
  });

  // Limpiar el input para permitir subir el mismo archivo de nuevo
  if (fileInputRef.value) {
    fileInputRef.value.value = '';
  }
}

function removeImage(index) {
  form.images.splice(index, 1);
  imageErrors.value = [];
}

function setAsMainImage(index) {
  if (index === 0) return;
  const [selectedImage] = form.images.splice(index, 1);
  form.images.unshift(selectedImage);
}

// Funciones para drag & drop
function handleDragOver(e) {
  e.preventDefault();
  e.stopPropagation();
}

function handleDrop(e) {
  e.preventDefault();
  e.stopPropagation();

  const files = e.dataTransfer.files;
  if (!files.length) return;

  // Validar cantidad de imágenes
  if (form.images.length + files.length > maxImages) {
    axiosConfig.ToastWarning('Límite de imágenes', `Solo se permiten hasta ${maxImages} imágenes.`);
    return;
  }

  imageErrors.value = [];

  Array.from(files).forEach(file => {
    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      imageErrors.value.push(`${file.name} no es una imagen válida.`);
      return;
    }

    // Validar tamaño
    if (file.size > maxFileSizeMB * 1024 * 1024) {
      imageErrors.value.push(`${file.name} supera el tamaño máximo de ${maxFileSizeMB}MB.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      form.images.push(ev.target.result);
    };
    reader.onerror = () => {
      imageErrors.value.push(`Error al leer ${file.name}.`);
    };
    reader.readAsDataURL(file);
  });
}

onMounted(() => {
  fetchFurniture();
  fetchCategories();
});

function getCategoryLabel(value) {
  // Si nos pasan un objeto category, devolver su nombre
  if (!value && value !== 0) return '-';
  if (typeof value === 'object') {
    return value.name || '-';
  }
  // value puede venir como id (number/string)
  const id = Number(value);
  const cat = categories.value.find(c => Number(c.id) === id);
  return cat ? cat.name : String(value);
}

function getStockClass(stock) {
  if (stock === undefined || stock === null) return '';
  if (stock === 0) return 'stock-empty';
  if (stock > 0 && stock <= 5) return 'stock-low';
  if (stock > 5 && stock <= 20) return 'stock-medium';
  if (stock > 20) return 'stock-high';
  return '';
}

// Helper para obtener la primera imagen de un mueble
function getMainImage(item) {
  // Si tiene un array de imágenes, devolver la primera
  if (item.images && Array.isArray(item.images) && item.images.length > 0) {
    const firstImage = item.images[0];
    return typeof firstImage === 'string' ? firstImage : (firstImage.img_base64 || firstImage.url || null);
  }
  // Fallback a img_base64 por compatibilidad
  if (item.img_base64) {
    return item.img_base64;
  }
  return null;
}

// Helper para obtener el total de imágenes
function getImageCount(item) {
  if (item.images && Array.isArray(item.images)) {
    return item.images.length;
  }
  if (item.img_base64) {
    return 1;
  }
  return 0;
}
</script>

<style scoped>
.admin-dashboard {
  font-family: 'Roboto', sans-serif;
  background-color: #f4f7fa;
  color: #333;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.dashboard-header {
  background-color: #007bff;
  color: #fff;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-content {
  display: flex;
  align-items: center;
}

.header-title-section {
  display: flex;
  align-items: center;
}

.header-title-section i {
  font-size: 2rem;
  margin-right: 0.5rem;
}

.header-title-section h1 {
  font-size: 1.5rem;
  margin: 0;
}

.header-title-section p {
  margin: 0;
  font-size: 0.875rem;
}

.logout-btn {
  background-color: transparent;
  border: none;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
}

.dashboard-content {
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.loading-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #fff;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.actions-bar {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.actions-left {
  display: flex;
  align-items: center;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.btn-primary i {
  margin-right: 0.5rem;
}

.btn-secondary {
  background-color: #6c757d;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.btn-secondary i {
  margin-right: 0.5rem;
}

.stats-summary {
  display: flex;
  align-items: center;
}

.stat-item {
  display: flex;
  align-items: center;
  margin-right: 1.5rem;
}

.stat-item i {
  font-size: 1.5rem;
  margin-right: 0.5rem;
}

.categories-section {
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.section-header {
  margin-bottom: 1rem;
}

.section-header h2 {
  font-size: 1.25rem;
  margin: 0;
}

.section-header p {
  margin: 0;
  font-size: 0.875rem;
  color: #6c757d;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.category-card-mini {
  background-color: #fff;
  border: 1px solid #e9ecef;
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cat-left {
  display: flex;
  align-items: center;
}

.icon-area-small {
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  background-color: #007bff;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.5rem;
}

.cat-mid {
  flex: 1;
}

.cat-name {
  font-weight: 500;
  margin: 0;
}

.muted.small {
  font-size: 0.875rem;
  color: #6c757d;
}

.cat-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-icon {
  background-color: transparent;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 1.25rem;
}

.btn-icon.btn-delete {
  color: #dc3545;
}

.table-container {
  flex: 1;
  overflow-x: auto;
}

.furniture-table {
  width: 100%;
  border-collapse: collapse;
}

.furniture-table th,
.furniture-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #e9ecef;
}

.furniture-table th {
  background-color: #f8f9fa;
  font-weight: 500;
}

.img-cell {
  width: 80px;
  height: 80px;
}

.img-wrapper {
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  overflow: hidden;
  position: relative;
}

.img-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.no-image {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 0.5rem;
}

.table-row {
  transition: background-color 0.2s;
}

.table-row:hover {
  background-color: #f1f3f5;
}

.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.empty-state i {
  font-size: 3rem;
  color: #007bff;
  margin-bottom: 1rem;
}

.empty-state h3 {
  font-size: 1.5rem;
  margin: 0 0 0.5rem 0;
}

.empty-state p {
  margin: 0 0 1rem 0;
  color: #6c757d;
}

.image-upload-wrapper {
  position: relative;
}

.file-input {
  display: none;
}

.file-label {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dashed #007bff;
  border-radius: 0.5rem;
  padding: 1rem;
  cursor: pointer;
  text-align: center;
}

.file-label i {
  font-size: 2rem;
  margin-right: 0.5rem;
}

.image-preview {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-form,
.modal-card {
  background: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}

.form-header {
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 10;
}

.form-header h2 {
  margin: 0;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.close-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: #333;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  transition: color 0.2s;
}

.close-btn:hover {
  color: #dc3545;
}

.form-body {
  padding: 1.5rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-column {
  display: flex;
  flex-direction: column;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #495057;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  font-size: 1rem;
  width: 100%;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.form-group textarea {
  resize: vertical;
}

.category-select-controls {
  display: flex;
  gap: 0.5rem;
  align-items: stretch;
}

.category-select-controls select {
  flex: 1;
}

.category-select-controls .btn-icon {
  padding: 0.5rem;
  background-color: #007bff;
  color: white;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
}

.category-select-controls .btn-icon:hover {
  background-color: #0056b3;
}

.form-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #e9ecef;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  position: sticky;
  bottom: 0;
  background: #fff;
  z-index: 10;
}

.btn-secondary {
  background-color: #6c757d;
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.stock-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  color: #fff;
}

.stock-empty {
  background-color: #dc3545;
}

.stock-low {
  background-color: #ffc107;
}

.stock-medium {
  background-color: #007bff;
}

.stock-high {
  background-color: #28a745;
}

.category-badge {
  background-color: #e7f3ff;
  color: #007bff;
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.color-dot {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid #dee2e6;
  margin-right: 0.5rem;
  vertical-align: middle;
}

/* Estilos para carga de múltiples imágenes */
.form-section-images {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 2px solid #e9ecef;
}

.form-section-images h3 {
  font-size: 1.1rem;
  color: #007bff;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.images-count {
  font-size: 0.8rem;
  background-color: #e7f3ff;
  border-radius: 20px;
  padding: 0.25rem 0.75rem;
  color: #007bff;
  font-weight: normal;
  margin-left: auto;
}

.image-uploader {
  margin-top: 1rem;
}

.image-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.image-item {
  position: relative;
}

.image-preview-box {
  height: 120px;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  border: 2px solid #e5e7eb;
  transition: all 0.3s;
}

.image-preview-box:hover {
  border-color: #007bff;
  box-shadow: 0 2px 8px rgba(0, 123, 255, 0.2);
}

.image-preview-box img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.image-preview-box:hover img {
  transform: scale(1.05);
}

.image-actions {
  position: absolute;
  top: 6px;
  right: 6px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  opacity: 0;
  transition: opacity 0.3s;
}

.image-preview-box:hover .image-actions {
  opacity: 1;
}

.remove-btn,
.main-btn {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  backdrop-filter: blur(4px);
  font-size: 0.9rem;
}

.remove-btn:hover {
  background-color: #dc3545;
  color: white;
  transform: scale(1.1);
}

.main-btn:hover {
  background-color: #ffc107;
  color: white;
  transform: scale(1.1);
}

.main-badge {
  position: absolute;
  top: 6px;
  left: 6px;
  background-color: rgba(40, 167, 69, 0.95);
  color: white;
  border-radius: 4px;
  padding: 3px 8px;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  gap: 3px;
  font-weight: 600;
}

.image-drop-area {
  height: 120px;
  border: 2px dashed #007bff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  padding: 1rem;
  text-align: center;
  color: #6c757d;
  background-color: #f8f9fa;
}

.image-drop-area:hover,
.image-drop-area.drag-over {
  border-color: #0056b3;
  background-color: #e7f3ff;
  transform: translateY(-2px);
}

.image-drop-area i {
  font-size: 2rem;
  color: #007bff;
  margin-bottom: 0.5rem;
}

.image-drop-area p {
  margin: 0.25rem 0;
  font-size: 0.85rem;
}

.browse-text {
  color: #007bff;
  font-weight: 600;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  text-decoration: underline;
}

.browse-text:hover {
  color: #0056b3;
}

.hidden-file-input {
  display: none;
}

.error-messages {
  margin-top: 1rem;
  background-color: #fff3cd;
  border: 1px solid #ffc107;
  border-radius: 0.5rem;
  padding: 0.75rem;
}

.error-message {
  margin: 0.25rem 0;
  font-size: 0.85rem;
  color: #856404;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.error-message i {
  color: #ffc107;
}

/* Transición del modal */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-form,
.modal-enter-active .modal-card {
  animation: modalSlideIn 0.3s ease;
}

.modal-leave-active .modal-form,
.modal-leave-active .modal-card {
  animation: modalSlideOut 0.3s ease;
}

@keyframes modalSlideIn {
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes modalSlideOut {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-50px);
    opacity: 0;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .modal-form,
  .modal-card {
    max-width: 95%;
    width: 95%;
  }

  .image-list {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }
}
</style>
