import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/login'
import Home from './views/home'
import './assets/base.less'
Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home
  }
  ]
})
router.beforeEach((to, from, next) => {
  // 登录不拦截
  if (to.path == '/login') return next()
  // 未登录有值 但没有token 强制跳转到登录页面
  const token = sessionStorage.getItem('token')
  if (!token) return next('/login')
  // 未登录有值 有token 放行 直接next()
  next()
})

export default router
