import { LicenseResponse } from '@/api/responses/LicenseResponse'
import { TimeflowOrchestratorProvider } from '@/api/TimeflowOrchestratorProvider'
import { LicensesRoute } from '@/router'
import DurationsStore from '@/store/DurationsStore'
import InstancesStore from '@/store/InstancesStore'
import PlansStore from '@/store/PlansStore'
import { ruleMessageToResult } from '@/utils/ruleMessageToRule'
import { Component, Vue, Watch } from 'vue-property-decorator'
import DatePicker from '@/ui/components/DatePicker.vue'
import { Formable } from './interfaces/Formable'

@Component({
  components: {
    DatePicker
  }
})
export default class LicensePage extends Vue implements Formable {
  readonly form: FormItem = {
    instance: {
      initial: -1,
      value: -1,
      readonly: false,
      rules: [
        () => this.form.instance.value > -1 || this.$vuetify.lang.t('$vuetify.common.error.required_field')
      ]
    },
    plan: {
      initial: -1,
      value: -1,
      readonly: false,
      rules: [
        () => this.form.plan.value > -1 || this.$vuetify.lang.t('$vuetify.common.error.required_field')
      ]
    },
    start_at: {
      initial: -1,
      value: '',
      readonly: false,
      rules: [
        () => this.form.start_at.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.error.required_field')
      ]
    },
    duration: {
      initial: -1,
      value: -1,
      readonly: false,
      rules: [
        () => this.form.duration.value > -1 || this.$vuetify.lang.t('$vuetify.common.error.required_field')
      ]
    },
    expired_at: {
      initial: -1,
      value: '',
      readonly: true,
      rules: []
    }
  }

  readonly loading = {
    card: false,
    submit: false
  }

  license!: LicenseResponse

  async created () {
    try {
      this.loading.card = true

      DurationsStore.loadDurations()
      PlansStore.loadPlans({ limit: -1, offset: 0 })
      InstancesStore.loadInstances({ search: '', limit: -1, offset: 0 })

      const response = await TimeflowOrchestratorProvider
        .getInstance()
        .getLicense(Number(this.$route.params.id))

      this.license = response.data

      this.form.instance.value = response.data.license.instance_id
      this.form.instance.initial = this.form.instance.value
      this.form.plan.value = response.data.license.plan_id
      this.form.plan.initial = this.form.plan.value
      this.form.start_at.value = response.data.license.effective_date
      this.form.start_at.initial = this.form.start_at.value
      this.form.duration.value = Math.round(Math.abs((new Date(response.data.license.valid_until).getTime() - new Date(response.data.license.effective_date).getTime()) / (24 * 60 * 60 * 1000)))
      this.form.duration.initial = this.form.duration.value
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

  get isEdited (): boolean {
    return Object.keys(this.form).some(it => {
      return !this.form[it].readonly && this.form[it].value !== this.form[it].initial
    })
  }

  cancel () {
    if (this.isEdited) {
      if (confirm(this.$vuetify.lang.t('$vuetify.common.label.confirm_close_dialog'))) {
        this.$router.replace(LicensesRoute)
      }
    } else {
      this.$router.replace(LicensesRoute)
    }
  }

  async submit () {
    try {
      this.loading.submit = true

      await TimeflowOrchestratorProvider
        .getInstance()
        .updateLicense({
          id: this.license.license.id,
          license: {
            instance_id: this.form.instance.value,
            plan_id: this.form.plan.value,
            effective_date: this.form.start_at.value,
            valid_until: this.form.expired_at.value
          }
        })

      this.$router.replace(LicensesRoute)
    } catch (err) {
      // TODO (2020.11.10): Handling error
    } finally {
      this.loading.submit = false
    }
  }

  set startAtLocaleDate (value: string) {
    this.form.start_at.value = value
  }

  get startAtLocaleDate () {
    return this.form.start_at.value !== ''
      ? new Date(this.form.start_at.value).toLocaleDateString()
      : this.form.start_at.value
  }

  set expiredAtLocaleDate (value: string) {
    this.form.expired_at.value = value
  }

  get expiredAtLocaleDate () {
    return this.form.expired_at.value !== ''
      ? new Date(this.form.expired_at.value).toLocaleDateString()
      : this.form.expired_at.value
  }

  get isValueUpdated () {
    return this.isEdited
  }

  get isSubmitButtonEnabled () {
    return Object.keys(this.form)
      .map(it => this.form[it].rules)
      .reduce((prev, current) => prev.concat(current), [])
      .map(it => ruleMessageToResult(it))
      .every(it => it) && this.isValueUpdated
  }

  get instances () {
    return InstancesStore.instances.map(it => ({
      value: it.id,
      readonly: false,
      text: it.name
    }))
  }

  get plans () {
    return PlansStore.plans.map(it => ({
      value: it.id,
      readonly: false,
      text: it.title
    }))
  }

  get durations () {
    return DurationsStore.durations.map(it => ({
      value: it,
      readonly: false,
      text: it
    }))
  }

  @Watch('form.duration.value')
  onDurationChanged (value: string) {
    try {
      if (this.form.start_at.rules.map(it => ruleMessageToResult(it)).every(it => it)) {
        const expiredAtDate = new Date(this.form.start_at.value)
        expiredAtDate.setDate(expiredAtDate.getDate() + Number(value))

        this.form.expired_at.value = expiredAtDate.toISOString().substr(0, 10)
      }
    } catch (err) {
      this.form.expired_at.value = ''
    }
  }

  @Watch('form.start_at.value')
  onStartAtChanged (value: string) {
    try {
      if (this.form.duration.rules.map(it => ruleMessageToResult(it)).every(it => it)) {
        const expiredAtDate = new Date(value)
        expiredAtDate.setDate(expiredAtDate.getDate() + Number(this.form.duration.value))

        this.form.expired_at.value = expiredAtDate.toISOString().substr(0, 10)
      }
    } catch (err) {
      this.form.expired_at.value = ''
    }
  }
}
