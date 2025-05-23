
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProductsView from '../views/ProductsView.vue';
import ProductDetail from '../components/ProductDetail.vue';
import ContactView from '../views/ContactView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/productos', component: ProductsView },
  { path: '/producto/:id', component: ProductDetail },
  { path: '/contacto', component: ContactView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
