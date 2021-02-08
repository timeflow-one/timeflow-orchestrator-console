import { Component, Vue, Watch } from 'vue-property-decorator'
import { BillsRoute, EnrollmentsRoute, InstancesRoute, LicensesRoute, LoginRoute, NotFoundRoute, PlansRoute, UsersRoute } from '@/router'
import NavigationDrawerUserCard from '@/ui/components/NavigationDrawerUserCard.vue'
import { MenuItem } from '@/models/MenuItem'
import AppbarMenuStore from '@/store/AppbarMenuStore'
import AuthStore from '@/store/AuthStore'
import EnrollmentsStore from '@/store/EnrollmentsStore'

@Component({
  components: {
    NavigationDrawerUserCard
  }
})
export default class AppView extends Vue {
  isNavigationDrawerShow = false
  menus: Array<Array<MenuItem>> = [
    [
      {
        ...EnrollmentsRoute,
        icon: 'mdi-account-multiple-plus',
        get badge () {
          return EnrollmentsStore.totalEnrollments
        }
      }
    ],
    [
      {
        ...InstancesRoute,
        icon: 'mdi-database'
      },
      {
        ...UsersRoute,
        icon: 'mdi-account-multiple'
      },
      {
        ...LicensesRoute,
        icon: 'mdi-clipboard-text-outline'
      },
      {
        ...BillsRoute,
        icon: 'mdi-file-document-edit-outline'
      },
      {
        ...PlansRoute,
        icon: 'mdi-text-box-outline'
      }
    ]
  ]

  async created () {
    try {
      await AuthStore.load()

      if (!AuthStore.isAuth && this.$route.name !== LoginRoute.name) {
        this.$router.replace({ name: LoginRoute.name })
      }
    } catch (err) {
      console.error(err)

      this.$router.replace({ name: LoginRoute.name })
    }
  }

  async mounted () {
    console.log(process.env.VUE_APP_VERSION)

    document.title = this.$vuetify.lang.t(`$vuetify.head.title.${this.$route.name}`)
    // слушатель для смены заголовка окна при перехоже на другую страницу
    this.$router.beforeEach((to, from, next) => {
      document.title = this.$vuetify.lang.t(`$vuetify.head.title.${to.name}`)
      next()
    })
    // загрузка списка заявок на создание аккаунта, для получения количества в меню навигации
    EnrollmentsStore.loadEnrollments({ offset: 0, limit: 0 })
  }

  get isAppbarProgress () {
    return false
  }

  get hasShowUi () {
    switch (this.$route.name) {
      case LoginRoute.name:
      case NotFoundRoute.name:
        return false

      default:
        return true
    }
  }

  get appbarMenu () {
    return AppbarMenuStore.items
  }

  get isAppbarMenuShow () {
    return AppbarMenuStore.isShow
  }

  get isAuth () {
    return AuthStore.isAuth
  }

  @Watch('isAuth')
  onLoginStateChanged (value: boolean) {
    if (!value) {
      this.isNavigationDrawerShow = false
      this.$router.replace({ name: LoginRoute.name })
    }
  }
}
