import { createRouter, createWebHistory } from 'vue-router';
import store from '../store/index.js';

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { to: 0, from: 0, savedPosition: null };
  },
  routes: [
    {
      path: '',
      component: () => import('@/components/layout/TheApplication.vue'),
      children: [
        {
          path: '',
          redirect: '/storage'
        },
        {
          path: '/storage',
          component: () => import('@/pages/user/Storage.vue'),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/key-management',
          component: () => import('@/pages/user/KeyManagement.vue'),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/statistics',
          component: () =>
            import('@/pages/administration/StatisticDashboard.vue'),
          meta: {
            requiresAuth: true,
            adminRoleRequired: true
          }
        }
      ]
    },
    {
      path: '',
      component: () => import('@/components/layout/TheFullPage.vue'),
      children: [
        {
          path: '/login',
          component: () => import('@/pages/authentication/Login.vue')
        },
        {
          path: '/register',
          component: () => import('@/pages/authentication/Register.vue')
        },
        {
          path: '/not-authorized',
          component: () => import('@/pages/error/NotAuthorized.vue')
        },
        {
          path: '/teapot',
          component: () => import('@/pages/error/Teapot.vue')
        },
        {
          path: '/server-error',
          component: () => import('@/pages/error/ServerError.vue')
        },
        {
          path: '/:notFound(.*)',
          component: () => import('@/pages/error/NotFound.vue')
        }
      ]
    }
  ]
});

router.beforeEach(function(to, _, next) {
  const isAuthenticated = store.getters['auth/isAuthenticated'];
  const isAdmin = store.getters['auth/isAdmin'];
  console.log(
    `[ROUTER]: auth/isAuthenticated: ${isAuthenticated}, auth/isAdmin: ${isAdmin}`
  );

  if (to.meta.adminRoleRequired && !isAdmin) {
    next('/not-authorized');
  } else if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

router.afterEach(() => {
  const appLoading = document.getElementById('loading-bg');
  if (appLoading) {
    appLoading.style.display = 'none';
  }
});

export default router;
