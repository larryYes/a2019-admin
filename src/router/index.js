import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  // 部署bot
  {
    path: '/v3/automations',
    component: Layout,
    redirect: '',
    name: '部署',
    meta: { title: '机器人部署', icon: '' },
    children: [
      {
        path: 'deploy',
        name: '部署',
        component: () => import('@/views/v3/deploy.vue'),
        meta: { title: '部署页面', icon: 'tree' }
      }
    ]
  },
  //活动
  {
    path:'/activity',
    component: Layout,
    meta: {title: '活动',icon: 'tree'},
    children:[
      {
        path: 'inprogress',
        component: () => import('@/views/v2/Bot Execution Orchestrator/inprogress.vue'),
        meta: {title: '正在进行',icon: 'form'},
      },
      {
        path: 'schedule',
        component: ()=> import('@/views/v2/Bot Execution Orchestrator/schedule.vue'),
        meta: {title: '已计划',icon:'form'}
      },
      {
        path: 'triggers',
        component: ()=> import('@/views/v2/Bot Execution Orchestrator/triggers.vue'),
        meta: {title: '事件触发器',icon:'form'}
      },
      {
        path: 'historical',
        component: ()=> import('@/views/v2/Bot Execution Orchestrator/historical'),
        meta: {title: '历史',icon:'form'}
      }
    ]
  },
    // 用户管理
    {
      path: '/system',
      component: Layout,
      redirect: '/example/table',
      name: '系统管理',
      meta: { title: '系统管理', icon: 'tree' },
      children: [
        {
          path: 'list',
          name: '用户列表',
          component: () => import('@/views/v1/user/index.vue'),
          meta: { title: '用户列表', icon: 'table' }
        },
        {
          path: 'roles',
          name: '角色列表',
          component: () => import('@/views/v1/role/index.vue'),
          meta: {title: '角色列表', icon: 'table'}
  
        },
        {
          path: 'devices',
          name: '设备列表',
          component: () => import('@/views/v2/Bot Execution Orchestrator/devices.vue'),
          meta: { title: '设备列表', icon: 'table' }
        },
      ]
    },
  //项目详情页
  {
    path: '/activity/inProgress/:id/detail',
    name: 'detail',
    component: ()=> import('@/views/v2/Bot Execution Orchestrator/detail')
  }  
  //   {
  //     path: '/example',
  //     component: Layout,
  //     redirect: '/example/table',
  //     name: 'Example',
  //     meta: { title: 'Example', icon: 'example' },
  //     children: [
  //       {
  //         path: 'table',
  //         name: 'Table',
  //         component: () => import('@/views/table/index'),
  //         meta: { title: 'Table', icon: 'table' }
  //       },
  //       {
  //         path: 'tree',
  //         name: 'Tree',
  //         component: () => import('@/views/tree/index'),
  //         meta: { title: 'Tree', icon: 'tree' }
  //       }
  //     ]
  //   },

  //   {
  //     path: '/form',
  //     component: Layout,
  //     children: [
  //       {
  //         path: 'index',
  //         name: 'Form',
  //         component: () => import('@/views/form/index'),
  //         meta: { title: 'Form', icon: 'form' }
  //       }
  //     ]
  //   },

  //   {
  //     path: '/nested',
  //     component: Layout,
  //     redirect: '/nested/menu1',
  //     name: 'Nested',
  //     meta: {
  //       title: 'Nested',
  //       icon: 'nested'
  //     },
  //     children: [
  //       {
  //         path: 'menu1',
  //         component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //         name: 'Menu1',
  //         meta: { title: 'Menu1' },
  //         children: [
  //           {
  //             path: 'menu1-1',
  //             component: () => import('@/views/nested/menu1/menu1-1'),
  //             name: 'Menu1-1',
  //             meta: { title: 'Menu1-1' }
  //           },
  //           {
  //             path: 'menu1-2',
  //             component: () => import('@/views/nested/menu1/menu1-2'),
  //             name: 'Menu1-2',
  //             meta: { title: 'Menu1-2' },
  //             children: [
  //               {
  //                 path: 'menu1-2-1',
  //                 component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //                 name: 'Menu1-2-1',
  //                 meta: { title: 'Menu1-2-1' }
  //               },
  //               {
  //                 path: 'menu1-2-2',
  //                 component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //                 name: 'Menu1-2-2',
  //                 meta: { title: 'Menu1-2-2' }
  //               }
  //             ]
  //           },
  //           {
  //             path: 'menu1-3',
  //             component: () => import('@/views/nested/menu1/menu1-3'),
  //             name: 'Menu1-3',
  //             meta: { title: 'Menu1-3' }
  //           }
  //         ]
  //       },
  //       {
  //         path: 'menu2',
  //         component: () => import('@/views/nested/menu2/index'),
  //         meta: { title: 'menu2' }
  //       }
  //     ]
  //   },

  //   {
  //     path: 'external-link',
  //     component: Layout,
  //     children: [
  //       {
  //         path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //         meta: { title: 'External Link', icon: 'link' }
  //       }
  //     ]
  //   },

  //   { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
