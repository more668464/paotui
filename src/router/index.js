import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRouterMap
 * a base page that does not have permission requirements
 * all roles can be accessed
 */


export const constantRouterMap = [
  // 登录界面
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  // 404报错提示页面
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // 首页
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  // 顾客管理
  // {
  //   path: '/customer',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'list',

  //       name: 'customer',
  //       component: () => import('@/views/customer/index'),
  //       meta: { title: '顾客管理', icon: 'peo' }
  //     }
  //   ]
  // },
  // // 顾客详情管理
  // {
  //   path: '/customerDetail/:id',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       //在侧边隐藏
  //       hidden: true,
  //       name: 'customerDetailIndex',
  //       component: () => import('@/views/customer/detail/index'),
  //       meta: { title: '顾客详情管理' }
  //     }
  //   ]
  // },
  // // 服务项目管理
  // {
  //   path: '/product',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'list',
  //       name: 'product',
  //       component: () => import('@/views/product/index'),
  //       meta: { title: '服务项目管理', icon: 'table' }
  //     }
  //   ]
  // },
  // //项目详情管理
  // {
  //   path: '/productDetail/:id',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       //在侧边隐藏
  //       hidden: true,
  //       name: 'productDetialIndex',
  //       component: () => import('@/views/product/detail/index'),
  //       meta: { title: '项目详情管理' }
  //     }
  //   ]
  // },
  // // 服务类型管理
  // {
  //   path: '/categroy',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'list',
  //       name: 'categroy',
  //       component: () => import('@/views/categroy/index'),
  //       meta: { title: '服务类型管理', icon: 'eye' }
  //     }
  //   ]
  // },
  // // 订单管理
  // {
  //   path: '/order',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'list',
  //       name: 'order',
  //       component: () => import('@/views/order/index'),
  //       meta: { title: '订单管理', icon: 'order' }
  //     }
  //   ]
  // },
  // //订单详情管理
  // {
  //   path: '/orderDetail/:id',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       //在侧边隐藏
  //       hidden: true,
  //       name: 'order',
  //       component: () => import('@/views/order/detail/index'),
  //       meta: { title: '订单详情管理' }
  //     }
  //   ]
  // },
  // // 员工管理
  // {
  //   path: '/waiter',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'list',
  //       name: 'waiter',
  //       component: () => import('@/views/waiter/index'),
  //       meta: { title: '员工管理', icon: 'user' }
  //     }
  //   ]
  // },
  // //员工详情
  // {
  //   path: '/waiterDetail/:id',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       hidden: true,

  //       name: 'waiter',
  //       component: () => import('@/views/waiter/detail/index'),
  //       meta: { title: '员工详情管理' }
  //     }
  //   ]
  // },
  // // 评论管理
  // {
  //   path: '/comment',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'list',
  //       name: 'comment',
  //       component: () => import('@/views/comment/index'),
  //       meta: { title: '评论管理', icon: 'nested' }
  //     }
  //   ]
  // },
  // // 审核
  // {
  //   path: '/examine',
  //   component: Layout,
  //   meta: { title: '审核大厅', icon: 'tree' },
  //   children: [
  //     // {
  //     //   path: 'waiterExamine',
  //     //   component: () => import('@/views/examine/waiterExamine'),
  //     //   meta: { title: '员工审核' }
  //     // },
  //     {
  //       path: 'cashExamine',
  //       component: () => import('@/views/examine/cashExamine'),
  //       meta: { title: '提现审核' }
  //     },
  //   ]
  // },


  // { path: '*', redirect: '/404', hidden: true }
]

export const asyncRouterMap = [

  {
    path: '/order',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'order',
        component: () => import('@/views/order/index'),
        meta: { title: '睡觉睡觉睡觉', role: ['admin'] },

      },

    ]
  },
  // {
  //   path: '/order',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'list',
  //       name: 'order',
  //       component: () => import('@/views/order/index'),
  //       meta: { title: '睡觉睡觉睡觉', role: ['waiter'] },

  //     },

  //   ]
  // },
  { path: '*', redirect: '/404', hidden: true }
];



const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

console.log(constantRouterMap, '000000')
// console.log(this.$store)
const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
