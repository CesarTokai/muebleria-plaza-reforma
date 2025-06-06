import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProductsView from '../views/ProductsView.vue';
import ProductDetail from '../components/ProductDetail.vue';
import ContactView from '../views/ContactView.vue';
import LoginView from '../views/LoginView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/productos', component: ProductsView },
  { path: '/producto/:id', component: ProductDetail, name: 'ProductoDetalle' }, 
  { path: '/contacto', component: ContactView },
  { path: '/login', component: LoginView },
  { path: '/admin', component: () => import('../views/AdminDashboard.vue'), meta: { requiresAuth: true } },
  {
    path: '/productos/:categoria',
    name: 'Productos',
    component: ProductsView,
    props: true
  },
  { path: '/:pathMatch(.*)*', component: () => import('../views/NotFound.vue') } // Ruta para Not Found
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role'); // Suponiendo que el rol del usuario se almacena en localStorage

  if (to.meta.requiresAuth && !token) {
    next('/login');
  } else if (to.path === '/admin' && userRole !== 'admin') {
    next('/'); // Redirigir al home si no es administrador
  } else {
    next();
  }
});

export default router;
