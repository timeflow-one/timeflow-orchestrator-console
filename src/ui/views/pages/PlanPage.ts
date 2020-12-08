import { PlanResponse } from '@/api/responses/PlanResponse'
import { TimeflowOrchestratorProvider } from '@/api/TimeflowOrchestratorProvider'
import { PlansRoute } from '@/router'
import CurrenciesStore from '@/store/CurrenciesStore'
import { ruleMessageToResult } from '@/utils/ruleMessageToRule'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Formable } from './interfaces/Formable'

@Component
export default class PlanPage extends Vue implements Formable {
  form: FormItem = {
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
      readonly: true,
      rules: [
        () => this.form.code.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.error.required_field')
      ]
    },
    employees_limit: {
      initial: 0,
      value: 0,
      readonly: false,
      rules: [
        () => this.form.employees_limit.value >= 0 || this.$vuetify.lang.t('$vuetify.common.error.fee_must_more_or_eq_0')
      ]
    },
    monthly_fee: {
      initial: 0,
      value: 0,
      readonly: false,
      rules: [
        () => this.form.monthly_fee.value >= 0 || this.$vuetify.lang.t('$vuetify.common.error.fee_must_more_or_eq_0')
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

  loading = {
    card: false,
    submit: false
  }

  plan!: PlanResponse

  async created () {
    try {
      this.loading.card = true

      CurrenciesStore.loadCurrencies()

      const response = await TimeflowOrchestratorProvider
        .getInstance()
        .getPlan(Number(this.$route.params.id))

      this.plan = response.data

      this.form.title.value = response.data.plan.title
      this.form.title.initial = this.form.title.value
      this.form.code.value = response.data.plan.code
      this.form.code.initial = this.form.code.value
      this.form.employees_limit.value = response.data.plan.employees_limit
      this.form.employees_limit.initial = this.form.employees_limit.value
      this.form.monthly_fee.value = response.data.plan.monthly_fee
      this.form.monthly_fee.initial = this.form.monthly_fee.value
      this.form.currency.value = response.data.plan.currency
      this.form.currency.initial = this.form.currency.value
    } catch (err) {
      // if (err.isAxiosError) {
      //   // TODO (2020.11.10): Error handling
      //   switch (err.response.status) {
      //     case 400: {
      //       alert(this.$vuetify.lang.t('$vuetify.pages.instance.error.400'))
      //       this.$router.replace(LicensesRoute)
      //     }
      //   }
      // }
    } finally {
      this.loading.card = false
    }
  }

  async submit () {
    try {
      this.loading.submit = true

      await TimeflowOrchestratorProvider
        .getInstance()
        .updatePlan({
          id: this.plan.plan.id,
          plan: {
            title: this.form.title.value,
            code: this.form.code.value,
            employees_limit: this.form.employees_limit.value,
            monthly_fee: this.form.monthly_fee.value,
            currency: this.form.currency.value
          }
        })

      this.$router.replace(PlansRoute)
    } catch (err) {

    } finally {
      this.loading.submit = false
    }
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

  get currencies () {
    return [...CurrenciesStore.currencies].map(it => ({
      value: it[0],
      readonly: false,
      text: this.$vuetify.lang.t(`$vuetify.common.label.currency.${it[0]}`)
    }))
  }

  get title () {
    return this.plan.plan.title
  }

  get isEdited () {
    return Object.keys(this.form).some(it => {
      return !this.form[it].readonly && this.form[it].value !== this.form[it].initial
    })
  }

  get isSubmitButtonEnabled () {
    return Object.keys(this.form)
      .map(it => this.form[it].rules)
      .reduce((prev, current) => prev.concat(current), [])
      .map(it => ruleMessageToResult(it))
      .every(it => it) && this.isEdited
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
