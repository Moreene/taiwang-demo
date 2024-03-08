import { createRouter, createWebHashHistory } from 'vue-router'
const FrontView = () => import('../views/FrontView.vue')
const HomeView = () => import('../views/frontend/HomeView.vue')
const AboutUsView = () => import('../views/frontend/AboutUsView.vue')
const FaqView = () => import('../views/frontend/FaqView.vue')
const ContactView = () => import('../views/frontend/ContactView.vue')
const ProductsView = () => import('../views/frontend/ProductsView.vue')
const ProductsTemplate = () => import('../views/frontend/ProductsTemplate.vue')
const ProductDetailView = () => import('../views/frontend/ProductDetailView.vue')
const CartView = () => import('../views/frontend/CartView.vue')
const OrderInfoView = () => import('../views/frontend/OrderInfoView.vue')
const PaymentView = () => import('../views/frontend/PaymentView.vue')
const OrderCheckedView = () => import('../views/frontend/OrderCheckedView.vue')
const AdminLoginView = () => import('../views/backend/AdminLoginView.vue')
const AdminView = () => import('../views/AdminView.vue')
const AdminProductsView = () => import('../views/backend/AdminProductsView.vue')
const AdminOrdersView = () => import('../views/backend/AdminOrdersView.vue')
const AdminCouponView = () => import('../views/backend/AdminCouponView.vue')
const ErrorPageView = () => import('../views/ErrorPageView.vue')

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: FrontView,
      children: [
        {
          path: '',
          component: HomeView,
        },
        {
          path: 'about',
          component: AboutUsView,
          meta: { BannerImage: 'url("https://images.unsplash.com/photo-1644677859469-701242656fa8?q=80&w=950&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")' },
        },
        {
          path: 'products',
          component: ProductsView,
          meta: { BannerImage: 'url("https://images.unsplash.com/photo-1628428798909-75a2d42a557e?q=80&w=950&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")' },
        },
        {
          path: 'products/:id',
          component: ProductDetailView,
        },
        {
          path: 'categories',
          component: ProductsView,
          redirect: '/products',
          children: [
            {
              path: ':category',
              component: ProductsTemplate,
              props: true,
            }
          ]
        },
        {
          path: 'cart',
          component: CartView,
        },
        {
          path: 'orderInfo',
          component: OrderInfoView,
        },
        {
          path: 'payment/:id',
          component: PaymentView,
        },
        {
          path: 'orderChecked',
          component: OrderCheckedView,
        },
        {
          path: 'faq',
          component: FaqView,
          meta: { BannerImage: 'url("https://images.unsplash.com/photo-1539755530862-00f623c00f52?q=80&w=950&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")' },
        },
        {
          path: 'contact',
          component: ContactView,
          meta: { BannerImage: 'url("https://images.unsplash.com/photo-1569058242252-623df46b5025?q=80&w=950&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")' },
        },
      ]
    },
    {
      path: '/adminLogin',
      component: AdminLoginView,
    },
    {
      path: '/admin',
      component: AdminView,
      meta: { navbarType: 'backend' },
      children: [
        {
          path: '',
          redirect: '/admin/products',
        },
        {
          path: 'products',
          component: AdminProductsView,
        },
        {
          path: 'orders',
          component: AdminOrdersView,
        },
        {
          path: 'coupon',
          component: AdminCouponView,
        }
      ],
    },
    {
      path: '/:pathMatch(.*)',
      component: ErrorPageView
    },
  ]
})

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  const linkActive = (() => {
    if (to.meta.navbarType === 'backend') {
      return 'backend-active'
    } else {
      return 'active'
    }
  })()

  router.options.linkActiveClass = linkActive
  next()
})

export default router
