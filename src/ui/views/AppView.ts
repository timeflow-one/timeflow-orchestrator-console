import { Component, Vue, Watch } from 'vue-property-decorator'
import { BillsRoute, InstancesRoute, LicensesRoute, LoginRoute, PlansRoute, UsersRoute } from '@/router'
import NavigationDrawerUserCard from '@/ui/components/NavigationDrawerUserCard.vue'
import { MenuItem } from '@/models/MenuItem'
import AppbarMenuStore from '@/store/AppbarMenuStore'
import AuthStore from '@/store/AuthStore'

@Component({
  components: {
    NavigationDrawerUserCard
  }
})
export default class AppView extends Vue {
  protected isNavigationDrawerShow = false
  protected menu: Array<MenuItem> = [
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
      icon: 'mdi-format-list-numbered'
    }
  ]

  async created () {
    try {
      await AuthStore.load()

      if (!AuthStore.isAuth && this.$route.name !== LoginRoute.name) {
        this.$router.replace({ name: LoginRoute.name })
      }
    } catch (err) {
      this.$router.replace({ name: LoginRoute.name })
    }
  }

  protected get isAppbarProgress () {
    return false
  }

  protected get hasShowUi () {
    switch (this.$route.name) {
      case InstancesRoute.name:
      case UsersRoute.name:
      case LicensesRoute.name:
      case BillsRoute.name:
      case PlansRoute.name:
        return true

      default:
        return false
    }
  }

  protected get appbarMenu () {
    return AppbarMenuStore.items
  }

  protected get isAppbarMenuShow () {
    return AppbarMenuStore.isShow
  }

  protected get isAuth () {
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
