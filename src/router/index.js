import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  // 前台首頁
  {
    path: '/',
    name: 'FrontView',
    component: () => import('../views/FrontView.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/Home.vue') // 首頁
      },
      {
        path: 'products',
        component: () => import('../views/ProductsView.vue')
      },
      {
        path: 'product/:id',
        component: () => import('../views/ProductDetail.vue')
      },
      {
        path: 'roadmap',
        component: () => import('../views/RoadmapView.vue')
      },
      {
        path: 'cart',
        component: () => import('../views/CartView.vue')
      },
      {
        path: 'checkout',
        component: () => import('../views/CartCheckout.vue')
      },
      {
        path: 'checkoutSuccess',
        component: () => import('../views/CartSuccess.vue')
      }
    ]
  },
  // 帳號登入
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue')
  },
  // 後台
  {
    path: '/admin',
    component: () => import('../views/backend/DashboardView.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/backend/ProductsAdmin.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/backend/OrderView.vue')
      },
      {
        path: 'coupons',
        component: () => import('../views/backend/CouponsAdmin.vue')
      }
    ]
  },
  // 404
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('../views/404NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active', // bootstrap CSS 樣式
  // 連至 hash 錨點
  scrollBehavior: function (to, from, savedPosition) {
    if (to.hash) {
      return { selector: to.hash }
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
