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
            <component :is="cat.icon" class="category-card-svg" />
          </div>
          <div class="category-card-title">{{ cat.name }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, defineComponent, h, markRaw } from 'vue';
import { useRouter } from 'vue-router';

// Iconos SVG como componentes Vue válidos
const IconStorage = defineComponent({
  name: 'IconStorage',
  render() {
    return h('svg', { width: 40, height: 40, viewBox: '0 0 40 40', fill: 'none' }, [
      h('rect', { x: 6, y: 8, width: 28, height: 24, rx: 4, fill: '#ffd700', stroke: '#860734', 'stroke-width': 2 }),
      h('rect', { x: 10, y: 12, width: 20, height: 6, rx: 2, fill: '#fff', stroke: '#860734', 'stroke-width': 1.5 }),
      h('rect', { x: 10, y: 22, width: 20, height: 6, rx: 2, fill: '#fff', stroke: '#860734', 'stroke-width': 1.5 })
    ]);
  }
});
const IconSofa = defineComponent({
  name: 'IconSofa',
  render() {
    return h('svg', { width: 40, height: 40, viewBox: '0 0 40 40', fill: 'none' }, [
      h('rect', { x: 6, y: 18, width: 28, height: 10, rx: 4, fill: '#ffd700', stroke: '#860734', 'stroke-width': 2 }),
      h('rect', { x: 10, y: 12, width: 20, height: 10, rx: 4, fill: '#fff', stroke: '#860734', 'stroke-width': 1.5 })
    ]);
  }
});
const IconOffice = defineComponent({
  name: 'IconOffice',
  render() {
    return h('svg', { width: 40, height: 40, viewBox: '0 0 40 40', fill: 'none' }, [
      h('rect', { x: 8, y: 20, width: 24, height: 8, rx: 2, fill: '#ffd700', stroke: '#860734', 'stroke-width': 2 }),
      h('rect', { x: 14, y: 10, width: 12, height: 10, rx: 2, fill: '#fff', stroke: '#860734', 'stroke-width': 1.5 })
    ]);
  }
});
const IconBed = defineComponent({
  name: 'IconBed',
  render() {
    return h('svg', { width: 40, height: 40, viewBox: '0 0 40 40', fill: 'none' }, [
      h('rect', { x: 6, y: 20, width: 28, height: 8, rx: 2, fill: '#ffd700', stroke: '#860734', 'stroke-width': 2 }),
      h('rect', { x: 10, y: 14, width: 20, height: 8, rx: 2, fill: '#fff', stroke: '#860734', 'stroke-width': 1.5 })
    ]);
  }
});
const IconDining = defineComponent({
  name: 'IconDining',
  render() {
    return h('svg', { width: 40, height: 40, viewBox: '0 0 40 40', fill: 'none' }, [
      h('rect', { x: 8, y: 24, width: 24, height: 6, rx: 2, fill: '#ffd700', stroke: '#860734', 'stroke-width': 2 }),
      h('rect', { x: 12, y: 10, width: 16, height: 14, rx: 4, fill: '#fff', stroke: '#860734', 'stroke-width': 1.5 })
    ]);
  }
});
const IconKitchen = defineComponent({
  name: 'IconKitchen',
  render() {
    return h('svg', { width: 40, height: 40, viewBox: '0 0 40 40', fill: 'none' }, [
      h('rect', { x: 8, y: 16, width: 24, height: 12, rx: 2, fill: '#ffd700', stroke: '#860734', 'stroke-width': 2 }),
      h('rect', { x: 12, y: 10, width: 16, height: 8, rx: 2, fill: '#fff', stroke: '#860734', 'stroke-width': 1.5 })
    ]);
  }
});
const IconUtensils = defineComponent({
  name: 'IconUtensils',
  render() {
    return h('svg', { width: 40, height: 40, viewBox: '0 0 40 40', fill: 'none' }, [
      h('rect', { x: 16, y: 10, width: 8, height: 20, rx: 4, fill: '#ffd700', stroke: '#860734', 'stroke-width': 2 }),
      h('rect', { x: 10, y: 30, width: 20, height: 4, rx: 2, fill: '#fff', stroke: '#860734', 'stroke-width': 1.5 })
    ]);
  }
});
const IconKids = defineComponent({
  name: 'IconKids',
  render() {
    return h('svg', { width: 40, height: 40, viewBox: '0 0 40 40', fill: 'none' }, [
      h('circle', { cx: 20, cy: 16, r: 8, fill: '#ffd700', stroke: '#860734', 'stroke-width': 2 }),
      h('rect', { x: 10, y: 26, width: 20, height: 8, rx: 4, fill: '#fff', stroke: '#860734', 'stroke-width': 1.5 })
    ]);
  }
});
const IconDecor = defineComponent({
  name: 'IconDecor',
  render() {
    return h('svg', { width: 40, height: 40, viewBox: '0 0 40 40', fill: 'none' }, [
      h('ellipse', { cx: 20, cy: 24, rx: 10, ry: 6, fill: '#ffd700', stroke: '#860734', 'stroke-width': 2 }),
      h('circle', { cx: 20, cy: 16, r: 6, fill: '#fff', stroke: '#860734', 'stroke-width': 1.5 })
    ]);
  }
});
const IconMirrors = defineComponent({
  name: 'IconMirrors',
  render() {
    return h('svg', { width: 40, height: 40, viewBox: '0 0 40 40', fill: 'none' }, [
      h('ellipse', { cx: 20, cy: 20, rx: 13, ry: 16, fill: '#fff', stroke: '#860734', 'stroke-width': 2 }),
      h('rect', { x: 10, y: 8, width: 20, height: 24, rx: 8, fill: '#ffd700', opacity: 0.18 }),
      h('rect', { x: 14, y: 12, width: 12, height: 16, rx: 4, fill: '#fff', stroke: '#ffd700', 'stroke-width': 1 })
    ]);
  }
});
const IconElectro = defineComponent({
  name: 'IconElectro',
  render() {
    return h('svg', { width: 40, height: 40, viewBox: '0 0 40 40', fill: 'none' }, [
      h('rect', { x: 10, y: 8, width: 20, height: 24, rx: 4, fill: '#fff', stroke: '#860734', 'stroke-width': 2 }),
      h('rect', { x: 14, y: 12, width: 12, height: 8, rx: 2, fill: '#ffd700', stroke: '#860734', 'stroke-width': 1.5 }),
      h('rect', { x: 14, y: 22, width: 12, height: 6, rx: 2, fill: '#ffd700', stroke: '#860734', 'stroke-width': 1.5 })
    ]);
  }
});
const IconBike = defineComponent({
  name: 'IconBike',
  render() {
    return h('svg', { width: 40, height: 40, viewBox: '0 0 40 40', fill: 'none' }, [
      h('circle', { cx: 13, cy: 30, r: 6, fill: '#fff', stroke: '#860734', 'stroke-width': 2 }),
      h('circle', { cx: 27, cy: 30, r: 6, fill: '#fff', stroke: '#860734', 'stroke-width': 2 }),
      h('rect', { x: 18, y: 18, width: 4, height: 8, rx: 2, fill: '#ffd700', stroke: '#860734', 'stroke-width': 1.5 }),
      h('rect', { x: 19, y: 10, width: 2, height: 8, rx: 1, fill: '#ffd700', stroke: '#860734', 'stroke-width': 1 })
    ]);
  }
});
const IconFridge = defineComponent({
  name: 'IconFridge',
  render() {
    return h('svg', { width: 40, height: 40, viewBox: '0 0 40 40', fill: 'none' }, [
      h('rect', { x: 12, y: 6, width: 16, height: 28, rx: 4, fill: '#fff', stroke: '#860734', 'stroke-width': 2 }),
      h('rect', { x: 14, y: 8, width: 12, height: 10, rx: 2, fill: '#ffd700', stroke: '#860734', 'stroke-width': 1.5 }),
      h('rect', { x: 14, y: 20, width: 12, height: 10, rx: 2, fill: '#ffd700', stroke: '#860734', 'stroke-width': 1.5 })
    ]);
  }
});
const IconBath = defineComponent({
  name: 'IconBath',
  render() {
    return h('svg', { width: 40, height: 40, viewBox: '0 0 40 40', fill: 'none' }, [
      h('rect', { x: 8, y: 22, width: 24, height: 8, rx: 4, fill: '#fff', stroke: '#860734', 'stroke-width': 2 }),
      h('ellipse', { cx: 20, cy: 22, rx: 12, ry: 4, fill: '#ffd700', opacity: 0.18 }),
      h('rect', { x: 16, y: 10, width: 8, height: 8, rx: 4, fill: '#ffd700', stroke: '#860734', 'stroke-width': 1.5 })
    ]);
  }
});

const router = useRouter();

const categories = ref([
  { name: "Almacenamiento y organización", icon: markRaw(IconStorage), active: true },
  { name: "Sala", icon: markRaw(IconSofa) },
  { name: "Oficina", icon: markRaw(IconOffice) },
  { name: "Camas y colchones", icon: markRaw(IconBed) },
  { name: "Comedor", icon: markRaw(IconDining) },
  { name: "Cocinas", icon: markRaw(IconKitchen) },
  { name: "Utensilios de cocina y vajilla", icon: markRaw(IconUtensils) },
  { name: "Bebés y niños", icon: markRaw(IconKids) },
  { name: "Decoración", icon: markRaw(IconDecor) },
  { name: 'Espejos y cuadros', icon: markRaw(IconMirrors) },
  { name: 'Electrodomésticos pequeños', icon: markRaw(IconElectro) },
  { name: 'Bicicletas', icon: markRaw(IconBike) },
  { name: 'Refrigeradores', icon: markRaw(IconFridge) },
  { name: 'Baño', icon: markRaw(IconBath) }
]);

function selectCategory(cat) {
  categories.value.forEach(c => (c.active = false));
  cat.active = true;
  router.push(`/productos/${cat.name}`);
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
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 2.1rem;
  justify-items: center;
}
.category-card {
  background: linear-gradient(135deg, #fffdfa 70%, #ffe8fa 100%);
  border-radius: 1.2rem;
  box-shadow: 0 4px 22px #86073413, 0 2px 10px #ffd70017;
  padding: 1.2rem 0.7rem 1.1rem 0.7rem;
  min-width: 120px;
  max-width: 180px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid #fff4f8;
  transition: box-shadow 0.18s, transform 0.18s, border-color 0.18s;
  text-align: center;
  position: relative;
  cursor: pointer;
}
.category-card.active,
.category-card:hover {
  box-shadow: 0 12px 40px #86073433, 0 4px 18px #ffd70033;
  transform: translateY(-6px) scale(1.04);
  border-color: #ffd700;
}
.category-card-img-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg,#f7f3f7 70%,#edeaea 100%);
  box-shadow: 0 2px 14px #86073409;
  border-radius: 14px;
  width: 70px; height: 70px;
  margin-bottom: 0.72rem;
  padding: 7px;
  transition: background 0.18s;
}
.category-card.active .category-card-img-wrap,
.category-card:hover .category-card-img-wrap {
  background: linear-gradient(135deg,#8607341b 40%, #fff 100%);
}
.category-card-svg {
  width: 54px;
  height: 54px;
  object-fit: contain;
  border-radius: 9px;
  background: #f9f9f9;
  box-shadow: 0 2px 9px #c6a1be0c;
  transition: filter 0.18s;
}
.category-card.active .category-card-svg,
.category-card:hover .category-card-svg {
  filter: drop-shadow(0 0 7px #86073433);
}
.category-card-title {
  font-size: 1.09rem;
  text-align: center;
  color: #2b2b2b;
  font-weight: 700;
  letter-spacing: 0.2px;
  white-space: pre-line;
  line-height: 1.14;
  max-width: 120px;
  transition: color 0.18s;
  margin-top: 0.5rem;
}
.category-card.active .category-card-title,
.category-card:hover .category-card-title {
  color: #860734;
}
@media (max-width: 1024px) {
  .category-cards-grid { gap: 1.1rem; }
  .category-card { min-width: 100px; max-width: 140px; padding: 0.8rem 0.3rem 0.7rem 0.3rem;}
  .category-card-img-wrap { width: 44px; height: 44px; margin-bottom: 0.32rem;}
  .category-card-svg { width: 34px; height: 34px; }
  .category-card-title { font-size: 0.92rem; max-width: 70px;}
}
</style>
