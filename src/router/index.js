import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProductsView from '../views/ProductsView.vue';
import ProductDetail from '../components/ProductDetail.vue';
import ContactView from '../views/ContactView.vue';
<<<<<<< HEAD
import LoginView from '../views/LoginView.vue';
=======
import CamasView from '../views/CamasView.vue';
import SalasView from '../views/SalasView.vue';
import ComedoresView from '../views/ComedoresView.vue';
import OficinaView from '../views/OficinaView.vue';
import BebesNinosView from '../views/BebesNinosView.vue';
>>>>>>> 30f9cdc6d0b1a7af40dc0c955d83a828510dcc41

const routes = [
  { path: '/', component: HomeView },
  { path: '/productos', component: ProductsView },
  { path: '/producto/:id', component: ProductDetail, name: 'ProductoDetalle' }, 
  { path: '/contacto', component: ContactView },
<<<<<<< HEAD
  { path: '/login', component: LoginView },
  { path: '/admin', component: () => import('../views/AdminDashboard.vue'), meta: { requiresAuth: true } },
=======
    { path: '/camas', component: CamasView },
  { path: '/salas', component: SalasView },
  { path: '/comedores', component: ComedoresView },
  { path: '/oficina', component: OficinaView },
  { path: '/bebes-ninos', component: BebesNinosView },
>>>>>>> 30f9cdc6d0b1a7af40dc0c955d83a828510dcc41
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem('token')) {
    next('/login');
  } else {
    next();
  }
});

export default router;
