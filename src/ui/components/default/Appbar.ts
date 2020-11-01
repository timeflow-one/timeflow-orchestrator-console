import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Appbar extends Vue {
  @Prop({ default: false })
  isApp!: boolean
}
