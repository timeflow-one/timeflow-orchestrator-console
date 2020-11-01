import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class NavigationDrawer extends Vue {
  @Prop({ default: false })
  isApp!: boolean
}
