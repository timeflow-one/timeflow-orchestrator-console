import AuthStore from '@/store/AuthStore'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class NavigationDrawerUserCard extends Vue {
  protected logout () {
    AuthStore.logout()
  }

  protected get profile () {
    return AuthStore.profile
  }
}
