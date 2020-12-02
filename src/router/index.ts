import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import LoginPage from '@/ui/views/LoginPage.vue'
import InstancesPage from '@/ui/views/pages/InstancesPage.vue'
import CreateInstancePage from '@/ui/views/pages/CreateInstancePage.vue'
import NotFoundPage from '@/ui/views/NotFoundPage.vue'
import UsersPage from '@/ui/views/pages/UsersPage.vue'
import InstancePage from '@/ui/views/pages/InstancePage.vue'
import UserPage from '@/ui/views/pages/UserPage.vue'
import PlansPage from '@/ui/views/pages/PlansPage.vue'
import LicensesPage from '@/ui/views/pages/LicensesPage.vue'
import CreateLicensePage from '@/ui/views/pages/CreateLicensePage.vue'
import LicensePage from '@/ui/views/pages/LicensePage.vue'
import CreatePlanPage from '@/ui/views/pages/CreatePlanPage.vue'

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

const CreateInstanceRoute: RouteConfig = {
  name: 'create_instance',
  path: 'create',
  component: CreateInstancePage
}

const InstancesRoute: RouteConfig = {
  name: 'instances',
  path: '/instances',
  component: InstancesPage,
  children: [
    CreateInstanceRoute,
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

const CreateLicenseRoute: RouteConfig = {
  name: 'create_license',
  path: 'create',
  component: CreateLicensePage
}

const LicenseRoute: RouteConfig = {
  name: 'license',
  path: ':id',
  component: LicensePage
}

const LicensesRoute: RouteConfig = {
  name: 'licenses',
  path: '/licenses',
  component: LicensesPage,
  children: [
    LicenseRoute,
    CreateLicenseRoute
  ]
}

const BillsRoute: RouteConfig = {
  name: 'bills',
  path: '/bills'
}

const CreatePlanRoute: RouteConfig = {
  name: 'create_plan',
  path: 'create',
  component: CreatePlanPage
}

const PlansRoute: RouteConfig = {
  name: 'plans',
  path: '/plans',
  component: PlansPage,
  children: [
    CreatePlanRoute
  ]
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
  CreateInstanceRoute,
  InstancesRoute,
  UserRoute,
  UsersRoute,
  LicenseRoute,
  CreateLicenseRoute,
  LicensesRoute,
  BillsRoute,
  CreatePlanRoute,
  PlansRoute,
  NotFoundRoute
}
