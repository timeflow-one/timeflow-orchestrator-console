import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import LoginPage from '@/ui/views/LoginPage.vue'
import InstancesPage from '@/ui/views/pages/InstancesPage.vue'
import NotFoundPage from '@/ui/views/NotFoundPage.vue'
import UsersPage from '@/ui/views/pages/UsersPage.vue'

Vue.use(VueRouter)

const LoginRoute: RouteConfig = {
  name: 'login',
  path: '/login',
  component: LoginPage
}

const InstancesRoute: RouteConfig = {
  name: 'instances',
  path: '/instances',
  component: InstancesPage
}

const UsersRoute: RouteConfig = {
  name: 'users',
  path: '/users',
  component: UsersPage
}

const LicensesRoute: RouteConfig = {
  name: 'licenses',
  path: '/licenses'
}

const BillsRoute: RouteConfig = {
  name: 'bills',
  path: '/bills'
}

const PlansRoute: RouteConfig = {
  name: 'plans',
  path: '/plans'
}

const NotFoundRoute: RouteConfig = {
  name: '404',
  path: '*',
  component: NotFoundPage
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    LoginRoute,
    InstancesRoute,
    UsersRoute,
    LicensesRoute,
    BillsRoute,
    PlansRoute,
    NotFoundRoute
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    return next({ name: InstancesRoute.name })
  }

  return next()
})

export default router

export {
  LoginRoute,
  InstancesRoute,
  UsersRoute,
  LicensesRoute,
  BillsRoute,
  PlansRoute
}
