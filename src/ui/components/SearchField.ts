import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class SearchField extends Vue {
  @Prop({ required: false })
  value!: string

  @Prop({ required: false })
  placeholder!: string

  @Prop({ default: false })
  disabled!: boolean

  get search () {
    return this.value
  }

  set search (value: string) {
    this.$emit('input', value)
  }
}
