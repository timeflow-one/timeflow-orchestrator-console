import { Component, Vue } from 'vue-property-decorator'
import Appbar from '@/ui/components/default/Appbar.vue'
import NavigationDrawer from '@/ui/components/default/NavigationDrawer.vue'
import Footer from '@/ui/components/default/Footer.vue'
import { LoginRoute } from '@/router'

@Component({
  components: {
    Appbar,
    NavigationDrawer,
    Footer
  }
})
export default class AppView extends Vue {
  get hasShowUi () {
    switch (this.$route.name) {
      case LoginRoute.name:
        return false

      default:
        return true
    }
  }
}
