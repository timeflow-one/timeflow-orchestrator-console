import { Component, Vue } from 'vue-property-decorator'
import Appbar from '@/ui/components/default/Appbar.vue'
import NavigationDrawer from '@/ui/components/default/NavigationDrawer.vue'
import Footer from '@/ui/components/default/Footer.vue'

@Component({
  components: {
    Appbar,
    NavigationDrawer,
    Footer
  }
})
export default class AppView extends Vue {
  message = 'Hello world!!'
}
