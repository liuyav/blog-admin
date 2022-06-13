import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/index.vue';

const routes: Array<RouteRecordRaw> = [
  // 仪表盘
  {
    path: '/',
    redirect: '/dashboard/analysis',
    component: Layout,
    meta: {
      title: 'Dashboard',
      keepAlive: true,
      requireAuth: true,
      icon: 'Platform',
    },
    children: [
      {
        path: '/dashboard/analysis',
        meta: {
          title: '分析页',
          keepAlive: true,
          requireAuth: true,
        },
        component: () => import('@/views/dashboard/analysis/index.vue'),
      },
      {
        path: '/dashboard/workbench',
        meta: {
          title: '工作台',
          keepAlive: true,
          requireAuth: true,
        },
        component: () => import('@/views/dashboard/workbench/index.vue'),
      },
    ],
  },
  // 文章管理
  {
    path: '/article',
    component: Layout,
    redirect: '/article/list',
    children: [
      {
        path: 'list',
        component: () => import('@/views/article/index.vue'),
        meta: {
          title: '文章管理',
          keepAlive: true,
          requireAuth: true,
          icon: 'Document',
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
