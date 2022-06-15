import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/index.vue';

const routes: Array<RouteRecordRaw> = [
  // 仪表盘
  {
    path: '/dashboard',
    name: 'DashBoard',
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
        path: 'analysis',
        meta: {
          title: '分析页',
          keepAlive: true,
          requireAuth: true,
        },
        component: () => import('@/views/dashboard/analysis/index.vue'),
      },
      {
        path: 'workbench',
        meta: {
          title: '工作台',
          keepAlive: true,
          requireAuth: true,
        },
        component: () => import('@/views/dashboard/workbench/index.vue'),
      },
    ],
  },
  // 内容管理
  {
    path: '/content',
    component: Layout,
    redirect: '/content/article',
    meta: {
      title: '内容管理',
      keepAlive: true,
      requireAuth: true,
      icon: 'Document',
    },
    children: [
      {
        path: 'article',
        component: () => import('@/views/content/article/index.vue'),
        meta: {
          title: '文章管理',
          keepAlive: true,
          requireAuth: true,
        },
      },
      {
        path: 'article/:type/:id?',
        name: 'Detail',
        component: () => import('@/views/content/article/Detail.vue'),
        meta: {
          title: '文章详情',
          hidden: true,
          activeMenu: '/content/article',
        },
      },
      {
        path: 'classify',
        component: () => import('@/views/content/classify/index.vue'),
        meta: {
          title: '分类管理',
          keepAlive: true,
          requireAuth: true,
        },
      },
      {
        path: 'tags',
        component: () => import('@/views/content/tags/index.vue'),
        meta: {
          title: '标签管理',
          keepAlive: true,
          requireAuth: true,
        },
      },
    ],
  },
  // 系统管理
  {
    path: '/system',
    component: Layout,
    redirect: '/system/account',
    meta: {
      title: '系统管理',
      keepAlive: true,
      requireAuth: true,
      icon: 'Setting',
    },
    children: [
      {
        path: 'account',
        component: () => import('@/views/system/account/index.vue'),
        meta: {
          title: '账号管理',
          keepAlive: true,
          requireAuth: true,
        },
      },
      {
        path: 'role',
        component: () => import('@/views/system/role/index.vue'),
        meta: {
          title: '角色管理',
          keepAlive: true,
          requireAuth: true,
        },
      },
      {
        path: 'menu',
        component: () => import('@/views/system/menu/index.vue'),
        meta: {
          title: '菜单管理',
          keepAlive: true,
          requireAuth: true,
        },
      },
      {
        path: 'pwd',
        component: () => import('@/views/system/pwd/index.vue'),
        meta: {
          title: '密码管理',
          keepAlive: true,
          requireAuth: true,
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
