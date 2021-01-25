import { LicensesRoute } from '@/router'
import { ruleMessageToResult } from '@/utils/ruleMessageToRule'
import { Component, Mixins, Vue, Watch } from 'vue-property-decorator'
import DatePicker from '@/ui/components/DatePicker.vue'
import PlansStore from '@/store/PlansStore'
import InstancesStore from '@/store/InstancesStore'
import DurationsStore from '@/store/DurationsStore'
import { TimeflowOrchestratorProvider } from '@/api/TimeflowOrchestratorProvider'
import { Formable } from './interfaces/Formable'
import FocusableMixin from '@/ui/mixins/FocusableMixin'

@Component({
  components: {
    DatePicker
  }
})
export default class CreateLicensePage extends Mixins<FocusableMixin>(FocusableMixin) implements Formable {
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
      initial: '',
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
      initial: '',
      value: '',
      readonly: true,
      rules: []
    }
  }

  readonly loading = {
    submit: false
  }

  async mounted () {
    DurationsStore.loadDurations()
    PlansStore.loadPlans({ limit: -1, offset: 0 })
    await InstancesStore.loadInstances({ search: '', limit: -1, offset: 0 })
    // устанавливает фокус на первом поле при загрузке страницы после загрузки списка инстансов
    this.setFocusOnFirstField()
  }

  async submit () {
    try {
      this.loading.submit = true
      await TimeflowOrchestratorProvider.getInstance().createLicense({
        license: {
          instance_id: this.form.instance.value,
          plan_id: this.form.plan.value,
          effective_date: this.form.start_at.value,
          valid_until: this.form.expired_at.value
        }
      })
      this.$router.replace(LicensesRoute)
    } catch (err) {
      // TODO (2020.11.06): Catching errors

      switch (err.response?.data?.exception?.message) {
        case 'Уже существует активная лицензия на указанные даты': {
          alert(this.$vuetify.lang.t('$vuetify.pages.create_license.error.already_exist'))
          break
        }

        default: {
          alert(err.response?.data?.exception?.message || err.message)
        }
      }
    } finally {
      this.loading.submit = false
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

  get isSubmitButtonEnabled () {
    return Object.keys(this.form)
      .map(it => this.form[it].rules)
      .reduce((prev, current) => prev.concat(current), [])
      .map(it => ruleMessageToResult(it))
      .every(it => it)
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
