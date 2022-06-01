import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: () => import('../views/404View.vue'),
    },
  ],
});

export default router;
