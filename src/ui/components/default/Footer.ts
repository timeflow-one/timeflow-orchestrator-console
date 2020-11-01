import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Footer extends Vue {
  @Prop({ default: false })
  isApp!: boolean
}
