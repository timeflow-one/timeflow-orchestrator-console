import AuthStore from '@/store/AuthStore'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class NavigationDrawerUserCard extends Vue {
  logout () {
    AuthStore.logout()
  }

  get initials () {
    return AuthStore.profile?.full_name.substr(0, 2).toUpperCase()
  }

  get profile () {
    return AuthStore.profile
  }
}
