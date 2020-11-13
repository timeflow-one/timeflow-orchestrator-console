import { LicensesRoute } from '@/router'
import { ruleMessageToResult } from '@/utils/ruleMessageToRule'
import { Component, Vue } from 'vue-property-decorator'
import DatePicker from '@/ui/components/DatePicker.vue'

@Component({
  components: {
    DatePicker
  }
})
export default class CreateLicensePage extends Vue {
  form: FormItem = {
    instance: {
      value: -1,
      rules: [
        () => this.form.instance.value > -1 || this.$vuetify.lang.t('$vuetify.common.error.required_field')
      ]
    },
    plan: {
      value: -1,
      rules: [
        () => this.form.plan.value > -1 || this.$vuetify.lang.t('$vuetify.common.error.required_field')
      ]
    },
    start_at: {
      value: '',
      rules: [
        () => this.form.start_at.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.error.required_field')
      ]
    },
    duration: {
      value: -1,
      rules: [
        () => this.form.duration.value > -1 || this.$vuetify.lang.t('$vuetify.common.error.required_field')
      ]
    },
    expired_at: {
      value: '',
      rules: []
    }
  }

  loading = {
    submit: false
  }

  async submit () {
    throw new Error('Not implemented')
  }

  cancel () {
    this.$router.replace(LicensesRoute)
  }

  get isSubmitButtonEnabled () {
    return Object.keys(this.form)
      .map(it => this.form[it].rules)
      .reduce((prev, current) => prev.concat(current), [])
      .map(it => ruleMessageToResult(it))
      .every(it => it)
  }
}
