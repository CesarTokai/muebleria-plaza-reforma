<template>
    <section class="category-cards-section">
      <div class="container">
        <div class="category-cards-grid">
          <div
            v-for="cat in categories"
            :key="cat.name"
            :class="['category-card', { active: cat.active }]"
            @click="() => selectCategory(cat)"
          >
            <div class="category-card-img-wrap">
              <i :class="cat.icon + ' category-card-svg'"></i>
            </div>
            <div class="category-card-title">{{ cat.name }}</div>
          </div>
        </div>
      </div>
    </section>
  </template>

  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  // Ajuste de íconos para las categorías mencionadas
const categories = ref([
  { name: "Almacenamiento y organización", icon: "bi-box-seam" },
  { name: "Sala", icon: "bi-house-door" },
  { name: "Oficina", icon: "bi-laptop" },
  { name: "Camas y colchones", icon: "bi-moon-stars" },
  { name: "Comedor", icon: "bi-cup-straw" },
  { name: "Cocinas", icon: "bi-egg-fried" },
  { name: "Utensilios de cocina y vajilla", icon: "bi-gear" },
  { name: "Bebés y niños", icon: "bi-person-badge" },
  { name: "Decoración", icon: "bi-palette" },
  { name: "Espejos y cuadros", icon: "bi-image" },
  { name: "Electrodomésticos pequeños", icon: "bi-plug" },
  { name: "Bicicletas", icon: "bi-bicycle" },
  { name: "Refrigeradores", icon: "bi-snow" },
  { name: "Baño", icon: "bi-droplet" }
]);

  function selectCategory(cat) {
    categories.value.forEach(c => (c.active = false));
    cat.active = true;
    router.push(`/productos/${cat.name}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  </script>

  <style scoped>
  .category-cards-section {
    background: #f9f9f9;
    border-radius: 0 0 1.3rem 1.3rem;
    box-shadow: 0 2px 24px #86073410, 0 6px 28px #9c27b022;
    border-bottom: 2.5px solid #edeaea;
    margin-bottom: 2.2rem;
    padding: 1.5rem 0 1.2rem;
    z-index: 10;
    position: relative;
  }
  .category-cards-section .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.1rem;
  }
  .category-cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 2.5rem;
    justify-items: center;
  }
  .category-card {
    background: linear-gradient(135deg, #ffffff 70%, #f8f9fa 100%);
    border-radius: 1.5rem;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    padding: 1.5rem 1rem;
    min-width: 140px;
    max-width: 200px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px solid #e9ecef;
    transition: box-shadow 0.2s, transform 0.2s, border-color 0.2s;
    text-align: center;
    position: relative;
    cursor: pointer;
  }
  .category-card.active,
  .category-card:hover {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
    transform: translateY(-8px) scale(1.05);
    border-color: #ffc107;
  }
  .category-card-img-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #f8f9fa 70%, #e9ecef 100%);
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    width: 80px;
    height: 80px;
    margin-bottom: 1rem;
    padding: 10px;
    transition: background 0.2s;
  }
  .category-card.active .category-card-img-wrap,
  .category-card:hover .category-card-img-wrap {
    background: linear-gradient(135deg, #ffc107 40%, #fff 100%);
  }
  .category-card-svg {
    font-size: 2.5rem;
    color: #6c757d;
    transition: color 0.2s;
  }
  .category-card.active .category-card-svg,
  .category-card:hover .category-card-svg {
    color: #ffc107;
  }
  .category-card-title {
    font-size: 1.1rem;
    text-align: center;
    color: #343a40;
    font-weight: 600;
    letter-spacing: 0.3px;
    white-space: pre-line;
    line-height: 1.2;
    max-width: 140px;
    transition: color 0.2s;
    margin-top: 0.5rem;
  }
  .category-card.active .category-card-title,
  .category-card:hover .category-card-title {
    color: #ffc107;
  }
  @media (max-width: 1024px) {
    .category-cards-grid { gap: 1.1rem; }
    .category-card { min-width: 100px; max-width: 140px; padding: 0.8rem 0.3rem 0.7rem 0.3rem;}
    .category-card-img-wrap { width: 44px; height: 44px; margin-bottom: 0.32rem;}
    .category-card-svg { width: 34px; height: 34px; }
    .category-card-title { font-size: 0.92rem; max-width: 70px;}
  }
  </style>
