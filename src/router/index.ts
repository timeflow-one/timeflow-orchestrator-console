import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import LoginPage from '@/ui/views/LoginPage.vue'
import BlankPage from '@/ui/views/BlankPage.vue'
import InstancesPage from '@/ui/views/pages/InstancesPage.vue'

Vue.use(VueRouter)

const LoginRoute: RouteConfig = {
  name: 'login',
  path: '/login',
  component: LoginPage
}

const BlankRoute: RouteConfig = {
  name: 'blank',
  path: '/blank',
  component: BlankPage
}

const InstancesRoute: RouteConfig = {
  name: 'instances',
  path: '/instances',
  component: InstancesPage
}

const UsersRoute: RouteConfig = {
  name: 'users',
  path: '/users'
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

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    BlankRoute,
    LoginRoute,
    InstancesRoute,
    UsersRoute,
    LicensesRoute,
    BillsRoute,
    PlansRoute
  ]
})

export {
  LoginRoute,
  InstancesRoute,
  UsersRoute,
  LicensesRoute,
  BillsRoute,
  PlansRoute
}
