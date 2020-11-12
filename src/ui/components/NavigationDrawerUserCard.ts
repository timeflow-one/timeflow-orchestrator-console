import AuthStore from '@/store/AuthStore'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class NavigationDrawerUserCard extends Vue {
  logout () {
    AuthStore.logout()
  }

  get profile () {
    return AuthStore.profile
  }
}
