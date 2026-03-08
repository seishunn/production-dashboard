import {createRouter, createWebHistory} from 'vue-router';
import DashboardView from '@/views/DashboardView.vue';
import ImportView from '@/views/ImportView.vue';
import ProductionListView from '@/views/ProductionListView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'productionList',
      component: ProductionListView
    },
    {
      path: '/production/:id',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/import',
      name: 'import',
      component: ImportView
    }
  ]
});

export default router;