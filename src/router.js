import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'
import AdminLayout from '@/layout/AdminLayout'
import DashboardAdmin from '@/layout/DashboardAdmin'
Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: 'dashboard',
      component: DashboardLayout,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "demo" */ './views/Dashboard.vue')
        },
        {
          path: '/icons',
          name: 'icons',
          component: () => import(/* webpackChunkName: "demo" */ './views/Icons.vue')
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import(/* webpackChunkName: "demo" */ './views/UserProfile.vue')
        },
        {
          path: '/maps',
          name: 'maps',
          component: () => import(/* webpackChunkName: "demo" */ './views/Maps.vue')
        },
        {
          path: '/tables',
          name: 'tables',
          component: () => import(/* webpackChunkName: "demo" */ './views/Tables.vue')
        },
        {
          path : '/kategori',
          name : 'kategori menu',
          component: () => import(/* webpackChunkName: "demo" */ './views/Kategori.vue')
        },
        {
          path : '/kategori/beli',
          name : 'beli',
          component: () => import(/* webpackChunkName: "demo" */ './views/Beli.vue')
        },
        {
          path : '/kategori/beli/checkout',
          name : 'checkout',
          component: () => import(/* webpackChunkName: "demo" */ './views/Checkout.vue')
        }
      ]
    },
    {
      path: '/',
      redirect: 'login',
      component: AuthLayout,
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import(/* webpackChunkName: "demo" */ './views/Login.vue')
        },
        {
          path: '/register',
          name: 'register',
          component: () => import(/* webpackChunkName: "demo" */ './views/Register.vue')
        }
      ]
    },
    {
      path : '/',
      
      component : AdminLayout,
      children : [
        {
          path : '/admin/login',
          name : 'adminlogin',
          component: () => import(/* webpackChunkName: "demo" */ './views/AdminLogin.vue')
        },
        {
          path : '/admin/register',
          name : 'adminregister',
          component: () => import(/* webpackChunkName: "demo" */ './views/AdminRegister.vue')
        }
      ]

    },
    {
      path : '/',
      component : DashboardAdmin,
      children : [
        {
          path : '/dashboard/admin',
          name : 'dashboard admin',
          component: () => import(/* webpackChunkName: "demo" */ './views/DashboardAdmin.vue')
        },
        {
          path : '/admin/kategori',
          name : 'kategori',
          component: () => import(/* webpackChunkName: "demo" */ './views/KategoriAdmin.vue')
        },
        {
          path : '/admin/tambah/kategori',
          name : 'tambah kategori',
          component: () => import(/* webpackChunkName: "demo" */ './views/TambahKategoriAdmin.vue')
        },
        {
          path : '/update/kategori/:id',
          name : 'update kategori',
          component: () => import(/* webpackChunkName: "demo" */ './views/UpdateKategoriAdmin.vue')
        },
        {
          path : '/admin/menu',
          name : 'menu',
          component: () => import(/* webpackChunkName: "demo" */ './views/MenuAdmin.vue')
        },
        {
          path : '/admin/tambah/menu',
          name : 'tambah menu',
          component: () => import(/* webpackChunkName: "demo" */ './views/TambahMenuAdmin.vue')
        },
        {
          path : '/update/menu/:id',
          name : 'update menu',
          component: () => import(/* webpackChunkName: "demo" */ './views/UpdateMenuAdmin.vue')
        },
        {
          path : '/admin/user',
          name : 'user',
          component: () => import(/* webpackChunkName: "demo" */ './views/User.vue')
        },
        {
          path : '/admin/pelanggan',
          name : 'pelanggan',
          component: () => import(/* webpackChunkName: "demo" */ './views/Pelanggan.vue')
        },
        {
          path : '/admin/order',
          name : 'order',
          component: () => import(/* webpackChunkName: "demo" */ './views/Order.vue')
        },
        {
          path : '/admin/order-detail',
          name : 'order detail',
          component: () => import(/* webpackChunkName: "demo" */ './views/OrderDetail.vue')
        },
        {
          path : '/admin/order/bayar/:id',
          name : 'bayar',
          component: () => import(/* webpackChunkName: "demo" */ './views/Bayar.vue')
        },
        {
          path : '/admin/order/hutang/:id',
          name : 'hutang',
          component: () => import(/* webpackChunkName: "demo" */ './views/Hutang.vue')
        }

      ]
    }
  ],
  mode : 'history'
})
