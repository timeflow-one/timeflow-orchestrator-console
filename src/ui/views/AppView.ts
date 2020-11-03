import { Component, Vue } from 'vue-property-decorator'
import { BillsRoute, InstancesRoute, LicensesRoute, PlansRoute, UsersRoute } from '@/router'
import NavigationDrawerUserCard from '@/ui/components/NavigationDrawerUserCard.vue'
import { MenuItem } from '@/models/MenuItem'
import AppbarMenuStore from '@/store/AppbarMenuStore'

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
}
