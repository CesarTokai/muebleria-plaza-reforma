<template>
  <section class="category-nav">
    <div class="container">
      <ul class="category-list">
        <li
          v-for="cat in categories"
          :key="cat.name"
          :class="{ active: cat.active }"
          @click="selectCategory(cat)"
        >
          <img :src="cat.img" :alt="cat.name" class="category-img" />
          <span class="category-title">{{ cat.name }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const categories = ref([
  {
    name: "Almacenamiento y organización",
    img: "https://www.ikea.com/mx/es/images/products/billy-librero-blanco__0625599_pe692385_s5.jpg",
    active: true,
  },
  {
    name: "Sala",
    img: "https://www.ikea.com/mx/es/images/products/klippan-sofa-2-plazas__0729990_pe737726_s5.jpg",
  },
  {
    name: "Oficina",
    img: "https://www.ikea.com/mx/es/images/products/micke-escritorio-blanco__0736013_pe740925_s5.jpg",
  },
  {
    name: "Camas y colchones",
    img: "https://www.ikea.com/mx/es/images/products/malm-estructura-cama__0625715_pe692480_s5.jpg",
  },
  {
    name: "Comedor",
    img: "https://www.ikea.com/mx/es/images/products/ingatorp-mesa-extensible__0736216_pe740943_s5.jpg",
  },
  {
    name: "Cocinas",
    img: "https://www.ikea.com/mx/es/images/products/sektion-armario-cocina__0464067_pe609836_s5.jpg",
  },
  {
    name: "Utensilios de cocina y vajilla",
    img: "https://www.ikea.com/mx/es/images/products/ikea-365-olla-con-tapa__0712856_pe728435_s5.jpg",
  },
  {
    name: "Bebés y niños",
    img: "https://www.ikea.com/mx/es/images/products/djungelskog-peluche__0710216_pe727965_s5.jpg",
  },
  {
    name: "Decoración",
    img: "https://www.ikea.com/mx/es/images/products/ikea-ps-vaso-decorativo__0713064_pe728447_s5.jpg",
  },
  {
    name: "Textiles",
    img: "https://www.ikea.com/mx/es/images/products/gosa-vadd-almohada__0136054_pe292732_s5.jpg",
  },
]);

function selectCategory(cat) {
  categories.value.forEach(c => (c.active = false));
  cat.active = true;
  // Aquí podrías emitir un evento o filtrar productos
}
</script>

<style scoped>
.category-nav {
  background: #fff;
  border-radius: 0 0 1.3rem 1.3rem;
  box-shadow: 0 2px 18px #86073413;
  border-bottom: 2px solid #eee;
  margin-bottom: 1.6rem;
  padding: 0.4rem 0 0.3rem 0;
}

.category-list {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 1.8rem;
  list-style: none;
  margin: 0;
  padding: 0 0.7rem;
}

.category-list li {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  min-width: 100px;
  transition: transform 0.16s, box-shadow 0.16s;
  border-bottom: 3px solid transparent;
  padding-bottom: 0.6rem;
  background: none;
}
.category-list li.active,
.category-list li:hover {
  border-bottom: 3px solid #860734;
  background: linear-gradient(0deg,#86073411 90%, transparent 100%);
  transform: translateY(-3px) scale(1.04);
  box-shadow: 0 6px 16px #86073408;
}
.category-img {
  width: 60px;
  height: 60px;
  object-fit: contain;
  margin-bottom: 0.7rem;
  border-radius: 8px;
  background: #fafafa;
  box-shadow: 0 2px 8px #86073409;
}
.category-title {
  font-size: 1rem;
  text-align: center;
  color: #2b2b2b;
  font-weight: 600;
  letter-spacing: 0.2px;
  white-space: pre-line;
  line-height: 1.15;
  max-width: 90px;
}
@media (max-width: 768px) {
  .category-list { gap: 0.6rem; }
  .category-img { width: 44px; height: 44px; }
  .category-title { font-size: 0.85rem; max-width: 65px;}
}
</style>
