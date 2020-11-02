import { LoginRoute } from '@/router'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class NavigationDrawerUserCard extends Vue {
  protected logout () {
    this.$router.replace({ name: LoginRoute.name })
  }
}
