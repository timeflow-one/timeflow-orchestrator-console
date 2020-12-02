import { TimeflowOrchestratorProvider } from '@/api/TimeflowOrchestratorProvider'
import { PlansRoute } from '@/router'
import CurrenciesStore from '@/store/CurrenciesStore'
import { ruleMessageToResult } from '@/utils/ruleMessageToRule'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Formable } from './interfaces/Formable'

@Component
export default class CreatePlanPage extends Vue implements Formable {
  readonly form: FormItem = {
    title: {
      value: '',
      rules: [
        () => this.form.title.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.error.required_field')
      ]
    },
    code: {
      value: '',
      rules: [
        () => this.form.code.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.error.required_field')
      ]
    },
    employees_limit: {
      value: '',
      rules: [
        () => this.form.employees_limit.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.error.required_field')
      ]
    },
    monthly_fee: {
      value: '',
      rules: [
        () => this.form.monthly_fee.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.error.required_field')
      ]
    },
    currency: {
      value: '',
      rules: [
        () => this.form.currency.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.error.required_field')
      ]
    }
  }

  readonly loading = {
    submit: false
  }

  async mounted () {
    CurrenciesStore.loadCurrencies()
    // устанавливает фокус на первом поле при загрузке страницы после загрузки списка инстансов
    this.setFocusOnFirstField()
  }

  cancel () {
    this.$router.replace(PlansRoute)
  }

  setFocusOnFirstField () {
    this.$nextTick(() => {
      setTimeout(() => {
        // @ts-expect-error
        this.$refs.focusedField.$refs.input.focus()
      }, 0)
    })
  }

  async submit () {
    try {
      this.loading.submit = true
      await TimeflowOrchestratorProvider.getInstance().createPlan({
        plan: {
          title: this.form.title.value,
          code: this.form.code.value,
          currency: this.form.currency.value,
          employees_limit: this.form.employees_limit.value,
          monthly_fee: this.form.monthly_fee.value
        }
      })
      this.$router.replace(PlansRoute)
    } catch (err) {
      // TODO (2020.11.06): Catching errors
    } finally {
      this.loading.submit = false
    }
  }

  get currencies () {
    return [...CurrenciesStore.currencies].map(it => ({
      value: it[0],
      text: this.$vuetify.lang.t(`$vuetify.common.label.currency.${it[0]}`)
    }))
  }

  get isSubmitButtonEnabled () {
    return Object.keys(this.form)
      .map(it => this.form[it].rules)
      .reduce((prev, current) => prev.concat(current), [])
      .map(it => ruleMessageToResult(it))
      .every(it => it)
  }

  @Watch('form.title.value')
  onTitleChanged (value: string) {
    try {
      this.form.code.value = value
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')
    } catch (err) {
      this.form.code.value = ''
    }
  }
}
