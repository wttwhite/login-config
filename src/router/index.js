import VueRouter from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/page-manage',
  },
  {
    path: '/packages-manage',
    name: 'packages-manage',
    title: '组件包管理',
    menu: true,
    component: () => import('@/views/packages-manage'),
  },
  {
    path: '/page-manage',
    name: 'page-manage',
    title: '页面管理',
    menu: true,
    component: () => import('@/views/page-manage'),
  },
  {
    path: '/page-manage/config',
    name: 'page-manage-config',
    title: '页面配置',
    component: () => import('@/views/page-manage/page-config'),
  },
  {
    path: '/page-manage/config/container',
    name: 'page-manage-config-container',
    title: '页面配置-iframe',
    component: () =>
      import('@/views/page-manage/page-config/page-center/container.vue'),
  },
  {
    path: '/page-manage/config/preview',
    name: 'page-manage-preview',
    title: '页面配置预览',
    component: () => import('@/views/page-manage/page-preview'),
  },
]

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)

  return originalPush.call(this, location).catch((err) => err)
}

VueRouter.prototype.replace = function replace(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)

  return originalPush.call(this, location).catch((err) => err)
}
export default routes
