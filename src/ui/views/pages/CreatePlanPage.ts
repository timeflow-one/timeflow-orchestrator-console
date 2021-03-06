import { TimeflowOrchestratorProvider } from '@/api/TimeflowOrchestratorProvider'
import { PlansRoute } from '@/router'
import CurrenciesStore from '@/store/CurrenciesStore'
import FocusableMixin from '@/ui/mixins/FocusableMixin'
import { ruleMessageToResult } from '@/utils/ruleMessageToRule'
import { Mixins } from 'vue-mixin-decorator'
import { Component } from 'vue-property-decorator'
import { Formable } from './interfaces/Formable'

@Component
export default class CreatePlanPage extends Mixins<FocusableMixin>(FocusableMixin) implements Formable {
  readonly form: FormItem = {
    title: {
      initial: '',
      value: '',
      readonly: false,
      rules: [
        () => this.form.title.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.error.required_field')
      ]
    },
    code: {
      initial: '',
      value: '',
      readonly: false,
      rules: [
        () => this.form.code.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.error.required_field')
      ]
    },
    employees_limit: {
      initial: '',
      value: '',
      readonly: false,
      rules: [
        () => this.form.employees_limit.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.error.required_field')
      ]
    },
    monthly_fee: {
      initial: '',
      value: '',
      readonly: false,
      rules: [
        () => this.form.monthly_fee.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.error.required_field')
      ]
    },
    currency: {
      initial: '',
      value: '',
      readonly: false,
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

  get isEdited (): boolean {
    return Object.keys(this.form).some(it => {
      return !this.form[it].readonly && this.form[it].value !== this.form[it].initial
    })
  }

  cancel () {
    if (this.isEdited) {
      if (confirm(this.$vuetify.lang.t('$vuetify.common.label.confirm_close_dialog'))) {
        this.$router.replace(PlansRoute)
      }
    } else {
      this.$router.replace(PlansRoute)
    }
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
      console.error(err)

      // TODO (2020.11.06): Catching errors
    } finally {
      this.loading.submit = false
    }
  }

  get currencies () {
    return [...CurrenciesStore.currencies].map(it => ({
      value: it[0],
      readonly: false,
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

  // @Watch('form.title.value')
  // onTitleChanged (value: string) {
  //   try {
  //     this.form.code.value = value
  //       .trim()
  //       .toLowerCase()
  //       .replace(/\s+/g, '-')
  //   } catch (err) {
  //     this.form.code.value = ''
  //   }
  // }
}
