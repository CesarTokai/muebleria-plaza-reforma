<template>
  <section class="category-nav-bar">
    <div class="container">
      <ul class="category-slider">
        <li
          v-for="cat in categories"
          :key="cat.name"
          :class="{ active: cat.active }"
          @click="selectCategory(cat)"
        >
          <span class="cat-img-wrap">
            <img :src="cat.img" :alt="cat.name" class="category-img" />
          </span>
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
 
]);

function selectCategory(cat) {
  categories.value.forEach(c => (c.active = false));
  cat.active = true;
  // Aquí podrías emitir un evento o filtrar productos
}
</script>



<style scoped>
  .category-nav-bar {
  background: #f9f9f9;
  border-radius: 0 0 1.3rem 1.3rem;
  box-shadow: 0 2px 24px #86073410, 0 6px 28px #9c27b022;
  border-bottom: 2.5px solid #edeaea;
  margin-bottom: 2.2rem;
  padding: 0.7rem 0 0.3rem;
  z-index: 10;
  position: relative;
}

.category-nav-bar .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.1rem;
}

.category-slider {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 2.1rem;
  list-style: none;
  margin: 0;
  padding: 0 0.7rem;
  scrollbar-width: thin;
  scrollbar-color: #bba6ba #eee;
}
.category-slider::-webkit-scrollbar {
  height: 9px;
  background: #eee;
  border-radius: 7px;
}
.category-slider::-webkit-scrollbar-thumb {
  background: #e5d5e5;
  border-radius: 7px;
}

.category-slider li {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  min-width: 104px;
  transition: transform 0.17s, box-shadow 0.17s, border-color 0.18s;
  border-bottom: 3px solid transparent;
  padding-bottom: 0.9rem;
  background: none;
  position: relative;
  outline: none;
}
.category-slider li.active,
.category-slider li:hover {
  border-bottom: 3px solid #860734;
  background: linear-gradient(0deg,#86073410 80%, transparent 100%);
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 6px 20px #86073410;
}

.cat-img-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg,#f7f3f7 70%,#edeaea 100%);
  box-shadow: 0 2px 14px #86073409;
  border-radius: 14px;
  width: 60px; height: 60px;
  margin-bottom: 0.72rem;
  padding: 6px;
  transition: background 0.18s;
}
.category-slider li.active .cat-img-wrap,
.category-slider li:hover .cat-img-wrap {
  background: linear-gradient(135deg,#8607341b 40%, #fff 100%);
}
.category-img {
  width: 46px;
  height: 46px;
  object-fit: contain;
  border-radius: 9px;
  background: #f9f9f9;
  box-shadow: 0 2px 9px #c6a1be0c;
  transition: filter 0.18s;
}
.category-slider li.active .category-img,
.category-slider li:hover .category-img {
  filter: drop-shadow(0 0 7px #86073433);
}

.category-title {
  font-size: 1.06rem;
  text-align: center;
  color: #2b2b2b;
  font-weight: 700;
  letter-spacing: 0.2px;
  white-space: pre-line;
  line-height: 1.14;
  max-width: 110px;
  transition: color 0.18s;
}
.category-slider li.active .category-title,
.category-slider li:hover .category-title {
  color: #860734;
}

@media (max-width: 1024px) {
  .category-slider { gap: 1.1rem; }
}
@media (max-width: 768px) {
  .category-nav-bar .container { padding: 0 0.4rem;}
  .category-slider { gap: 0.6rem; padding: 0 0.3rem;}
  .cat-img-wrap { width: 44px; height: 44px; margin-bottom: 0.32rem;}
  .category-img { width: 34px; height: 34px; }
  .category-title { font-size: 0.92rem; max-width: 70px;}
}

</style>
