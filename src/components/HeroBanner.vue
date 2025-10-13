<template>
  <section class="hero-banner-section" aria-label="Categorías principales de productos">
    <div class="container">
      <h2 class="hero-title">Explora el catálogo</h2>
      <p class="hero-subtitle">Encuentra todo lo que necesitas para tu hogar</p>

      <CategoriesGrid
        :items="categoryItems"
        @select="selectCategory"
      />
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import CategoriesGrid from './CategoriesGrid.vue';

const router = useRouter();

// Categorías con iconos Bootstrap Icons
const categories = [
  { name: "Rebajas", icon: "bi-tag", slug: "rebajas" },
  { name: "Novedades", icon: "bi-megaphone", slug: "novedades" },
  { name: "Colchones", icon: "bi-moon", slug: "colchones" },
  { name: "Bases de cama", icon: "bi-grid-3x3", slug: "bases-de-cama" },
  { name: "Recámaras", icon: "bi-door-closed", slug: "recamaras" },
  { name: "Tocadores y Zapateras", icon: "bi-box-seam", slug: "tocadores-zapateras" },
  { name: "Clósets", icon: "bi-archive", slug: "closets" },
  { name: "Cocinas para Estufa", icon: "bi-fire", slug: "cocinas-estufa" },
  { name: "Cocinas para Parrilla", icon: "bi-grid", slug: "cocinas-parrilla" },
  { name: "Cocinas en Escuadra", icon: "bi-bounding-box", slug: "cocinas-escuadra" },
  { name: "Esquineros de Cocina", icon: "bi-columns", slug: "esquineros-cocina" },
  { name: "Despenseros y Portamicro", icon: "bi-cabinet", slug: "despenseros-portamicro" },
  { name: "Islas y Barras", icon: "bi-table", slug: "islas-barras" },
  { name: "Accesorios de Cocina", icon: "bi-basket", slug: "accesorios-cocina" },
  { name: "Comedores", icon: "bi-cup-straw", slug: "comedores" },
  { name: "Desayunadores", icon: "bi-cup-hot", slug: "desayunadores" },
  { name: "Bufeteros y Vitrinas", icon: "bi-display", slug: "bufeteros-vitrinas" },
  { name: "Salas y Sofá cama", icon: "bi-house-door", slug: "salas-sofa-cama" },
  { name: "Muebles de TV", icon: "bi-tv", slug: "muebles-tv" },
  { name: "Libreros y Estantes", icon: "bi-bookshelf", slug: "libreros-estantes" },
  { name: "Cantinas y Barras", icon: "bi-cup", slug: "cantinas-barras" },
  { name: "Mesas de Centro", icon: "bi-table", slug: "mesas-centro" },
  { name: "Muebles de Oficina", icon: "bi-laptop", slug: "muebles-oficina" },
  { name: "Muebles de Baño", icon: "bi-droplet", slug: "muebles-bano" },
  { name: "Muebles Infantiles", icon: "bi-person-badge", slug: "muebles-infantiles" },
  { name: "Decoración", icon: "bi-palette", slug: "decoracion" }
];

// Convertir categorías al formato esperado por CategoriesGrid
const categoryItems = computed(() =>
  categories.map(cat => ({
    id: cat.slug,
    name: cat.name,
    icon: `<i class="${cat.icon}" style="font-size: 2.5rem;"></i>`,
    href: `/productos/${cat.slug}`,
    slug: cat.slug
  }))
);

function selectCategory(item) {
  if (item && item.href) {
    router.push(item.href);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
</script>

<style scoped>
.hero-banner-section {
  background: linear-gradient(135deg, #fdfbff 0%, #f8f4fc 50%, #f3ebf7 100%);
  border-radius: 0 0 1.5rem 1.5rem;
  box-shadow:
    0 4px 24px rgba(134, 7, 52, 0.08),
    0 2px 12px rgba(134, 7, 52, 0.04);
  border-bottom: 3px solid rgba(134, 7, 52, 0.1);
  margin-bottom: 3rem;
  padding: 2.5rem 0 2rem;
  position: relative;
  overflow: hidden;
}

.hero-banner-section::before {
  content: '';
  position: absolute;
  top: -30%;
  right: -15%;
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.06) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
  z-index: 1;
}

.hero-title {
  color: #860734;
  font-weight: 800;
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  text-align: center;
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.hero-subtitle {
  color: #a0616f;
  font-size: clamp(0.95rem, 2vw, 1.1rem);
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 500;
}

/* Estilos específicos para las categorías del hero */
:deep(.categories-grid) {
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 1rem;
}

:deep(.category-item) {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

:deep(.tile) {
  background: #efebe6;
  box-shadow:
    0 2px 8px rgba(15, 23, 42, 0.06),
    0 1px 3px rgba(15, 23, 42, 0.04);
}

:deep(.category-item:hover .tile) {
  background: linear-gradient(135deg, #fff9e6 0%, #efebe6 100%);
  box-shadow:
    0 8px 24px rgba(134, 7, 52, 0.12),
    0 4px 12px rgba(255, 215, 0, 0.15);
}

:deep(.category-item:focus .tile) {
  outline: 3px solid rgba(134, 7, 52, 0.3);
  outline-offset: 2px;
}

:deep(.icon-box i) {
  color: #4a3440;
  opacity: 0.85;
}

:deep(.category-item:hover .icon-box i) {
  color: #860734;
  opacity: 1;
}

:deep(.label) {
  color: #2d1f28;
  font-weight: 700;
}

:deep(.category-item:hover .label) {
  color: #860734;
}

@media (min-width: 1400px) {
  :deep(.categories-grid) {
    grid-template-columns: repeat(7, 1fr);
  }
}

@media (min-width: 1200px) and (max-width: 1399px) {
  :deep(.categories-grid) {
    grid-template-columns: repeat(6, 1fr);
  }
}

@media (min-width: 900px) and (max-width: 1199px) {
  :deep(.categories-grid) {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (min-width: 640px) and (max-width: 899px) {
  :deep(.categories-grid) {
    grid-template-columns: repeat(4, 1fr);
    gap: 0.75rem;
  }

  .hero-banner-section {
    padding: 2rem 0 1.5rem;
  }
}

@media (max-width: 639px) {
  :deep(.categories-grid) {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.6rem;
  }

  .hero-banner-section {
    padding: 1.5rem 0 1.25rem;
    border-radius: 0 0 1rem 1rem;
    margin-bottom: 2rem;
  }

  .hero-subtitle {
    margin-bottom: 1.5rem;
  }

  :deep(.tile) {
    border-radius: 0.6rem;
  }

  :deep(.label) {
    font-size: 0.8rem;
  }
}

@media (max-width: 400px) {
  :deep(.categories-grid) {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
