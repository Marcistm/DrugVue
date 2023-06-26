import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, resolve, reject) {
  if ( resolve || reject ) return originalPush.call(this, location, resolve, reject)
  return originalPush.call(this, location).catch((e)=>{})
}

export const constRouter = [
  {
    path: '/login',
    component: () => import('@/views/login/Login'),
    hidden: true //导航菜单忽略选项
  },

  {
    path: '/param',
    component: () => import('@/views/Param'),
    hidden: true //导航菜单忽略选项
  },
  {
    path: '/home',
    component: () => import('@/views/Home'),
    hidden: true,
    meta: {
      requiresAuth: true,
    }
  },

]
export const asyncRoutes = [

]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constRouter
})

export default router
