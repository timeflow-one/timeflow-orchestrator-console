import { Component, Vue } from 'vue-property-decorator'
import { BillsRoute, InstancesRoute, LicensesRoute, LoginRoute, PlansRoute, UsersRoute } from '@/router'
import NavigationDrawerUserCard from '@/ui/components/NavigationDrawerUserCard.vue'
import { MenuItem } from '@/utils/MenuItem'

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
      icon: 'mdi-notebook-outline'
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

  protected get hasShowUi () {
    switch (this.$route.name) {
      case LoginRoute.name:
        return false

      default:
        return true
    }
  }
}
