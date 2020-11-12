import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import LoginPage from '@/ui/views/LoginPage.vue'
import InstancesPage from '@/ui/views/pages/InstancesPage.vue'
import AddInstancePage from '@/ui/views/pages/AddInstancePage.vue'
import NotFoundPage from '@/ui/views/NotFoundPage.vue'
import UsersPage from '@/ui/views/pages/UsersPage.vue'
import InstancePage from '@/ui/views/pages/InstancePage.vue'
import UserPage from '@/ui/views/pages/UserPage.vue'
import PlansPage from '@/ui/views/pages/PlansPage.vue'

Vue.use(VueRouter)

const LoginRoute: RouteConfig = {
  name: 'login',
  path: '/login',
  component: LoginPage
}

const InstanceRoute: RouteConfig = {
  name: 'instance',
  path: ':id',
  component: InstancePage
}

const AddInstanceRoute: RouteConfig = {
  name: 'add-instance',
  path: 'add',
  component: AddInstancePage
}

const InstancesRoute: RouteConfig = {
  name: 'instances',
  path: '/instances',
  component: InstancesPage,
  children: [
    AddInstanceRoute,
    InstanceRoute
  ]
}

const UserRoute: RouteConfig = {
  name: 'user',
  path: ':id',
  component: UserPage
}

const UsersRoute: RouteConfig = {
  name: 'users',
  path: '/users',
  component: UsersPage,
  children: [
    UserRoute
  ]
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
  path: '/plans',
  component: PlansPage
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
  InstanceRoute,
  AddInstanceRoute,
  InstancesRoute,
  UserRoute,
  UsersRoute,
  LicensesRoute,
  BillsRoute,
  PlansRoute,
  NotFoundRoute
}
