<template>
  <ul class="categories-grid" role="list">
    <li
      v-for="(item, idx) in items"
      :key="item.id || idx"
      class="category-item"
      tabindex="0"
      @click="onClick(item)"
      @keydown.enter="onClick(item)"
      @keydown.space.prevent="onClick(item)"
    >
      <div class="tile">
        <div class="icon-box" aria-hidden="true" v-html="item.icon"></div>
      </div>
      <div class="label">{{ item.name }}</div>
    </li>
  </ul>
</template>

<script setup>
import { defineEmits } from 'vue';

defineProps({
  items: { type: Array, default: () => [] }
});

const emit = defineEmits(['select']);

function onClick(item) {
  emit('select', item);
}
</script>

<style scoped>
.categories-grid {
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  align-items: start;
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-item {
  text-align: center;
  cursor: pointer;
  outline: none;
  transition: transform 0.2s ease;
}

.category-item:focus {
  outline: 2px solid rgba(134, 7, 52, 0.4);
  outline-offset: 3px;
  border-radius: 10px;
}

.category-item:active {
  transform: scale(0.98);
}

.tile {
  width: 100%;
  aspect-ratio: 1 / 1;
  background: #efebe6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 10px auto;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: #111827;
  border: 1px solid rgba(15, 23, 42, 0.05);
}

.category-item:hover .tile {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(2, 6, 23, 0.08);
}

.icon-box {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-box svg {
  width: 56px;
  height: 56px;
  color: #111827;
  opacity: 0.95;
}

.icon-box i {
  font-size: 2.5rem;
  color: #4a3440;
  opacity: 0.85;
  transition: all 0.3s ease;
}

.category-item:hover .icon-box i {
  color: #860734;
  opacity: 1;
  transform: scale(1.05);
}

.label {
  font-size: 0.9rem;
  font-weight: 700;
  color: #111827;
  max-width: 120px;
  margin: 0 auto;
  line-height: 1.3;
  transition: color 0.3s ease;
}

.category-item:hover .label {
  color: #860734;
}

@media (min-width: 1200px) {
  .categories-grid {
    grid-template-columns: repeat(7, 1fr);
  }

  .label {
    max-width: none;
  }
}

@media (max-width: 640px) {
  .categories-grid {
    gap: 10px;
    grid-template-columns: repeat(3, 1fr);
  }

  .icon-box svg,
  .icon-box i {
    width: 44px;
    height: 44px;
    font-size: 2rem;
  }

  .label {
    font-size: 0.8rem;
  }
}
</style>

