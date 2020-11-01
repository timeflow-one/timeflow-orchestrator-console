import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import LoginPage from '@/ui/views/LoginPage.vue'

Vue.use(VueRouter)

const LoginRoute: RouteConfig = {
  name: 'login',
  path: '/login',
  component: LoginPage
}

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    LoginRoute
  ]
})

export { LoginRoute }
