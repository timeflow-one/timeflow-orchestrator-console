import Vue from 'vue'
import { Mixin } from 'vue-mixin-decorator'

@Mixin
export default class FocusableMixin extends Vue {
  setFocusOnFirstField () {
    this.$nextTick(() => {
      setTimeout(() => {
        // @ts-expect-error
        this.$refs.focusedField.$refs.input.focus()
      }, 0)
    })
  }
}
