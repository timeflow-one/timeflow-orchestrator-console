import { InstancesRoute } from '@/router'
import { Component, Vue } from 'vue-property-decorator'
import PasswordComponent from '@/ui/components/PasswordComponent.vue'
import { TimeflowOrchestratorProvider } from '@/api/TimeflowOrchestratorProvider'
import { ruleMessageToResult } from '@/utils/ruleMessageToRule'
import PlansStore from '@/store/PlansStore'
import { emailRegex as emailRegexp } from '@/utils/EmailRegex'
import DatePicker from '@/ui/components/DatePicker.vue'
import { Formable } from './interfaces/Formable'

@Component({
  components: {
    PasswordComponent,
    DatePicker
  }
})
export default class CreateInstancePage extends Vue implements Formable {
  readonly loading = {
    submit: false
  }

  readonly form: FormItem = {
    instance_name: {
      initial: '',
      value: '',
      readonly: false,
      rules: [
        () => this.form.instance_name.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.error.required_field'),
        () => !this.form.instance_name.value.match(/\s/) || this.$vuetify.lang.t('$vuetify.common.error.no_spaces')
      ]
    },
    db_host: {
      initial: '',
      value: '',
      readonly: false,
      rules: [
        () => this.form.db_host.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.error.required_field'),
        () => !this.form.db_host.value.match(/\s/) || this.$vuetify.lang.t('$vuetify.common.error.no_spaces')
      ]
    },
    db_name: {
      initial: '',
      value: '',
      readonly: false,
      rules: [
        () => this.form.db_name.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.error.required_field'),
        () => !this.form.db_name.value.match(/\s/) || this.$vuetify.lang.t('$vuetify.common.error.no_spaces')
      ]
    },
    db_user: {
      initial: '',
      value: '',
      readonly: false,
      rules: [
        () => this.form.db_user.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.error.required_field'),
        () => !this.form.db_user.value.match(/\s/) || this.$vuetify.lang.t('$vuetify.common.error.no_spaces')
      ]
    },
    db_pass: {
      initial: '',
      value: '',
      readonly: false,
      rules: [
        () => this.form.db_pass.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.error.required_field'),
        () => !this.form.db_pass.value.match(/\s/) || this.$vuetify.lang.t('$vuetify.common.error.no_spaces')
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
    expired_at: {
      initial: '',
      value: '',
      readonly: false,
      rules: [
        () => this.form.expired_at.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.error.required_field'),
        () => !this.form.expired_at.value.match(/\s/) || this.$vuetify.lang.t('$vuetify.common.error.no_spaces')
      ]
    },
    vi_key: {
      initial: '',
      value: '',
      readonly: false,
      rules: [
        () => this.form.vi_key.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.error.required_field'),
        () => !this.form.vi_key.value.match(/\s/) || this.$vuetify.lang.t('$vuetify.common.error.no_spaces')
      ]
    },
    geo_key: {
      initial: '',
      value: '',
      readonly: false,
      rules: [
        () => this.form.geo_key.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.error.required_field'),
        () => !this.form.geo_key.value.match(/\s/) || this.$vuetify.lang.t('$vuetify.common.error.no_spaces')
      ]
    },
    username: {
      initial: '',
      value: '',
      readonly: false,
      rules: [
        () => this.form.username.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.error.required_field'),
        () => !this.form.username.value.match(/\s/) || this.$vuetify.lang.t('$vuetify.common.error.no_spaces')
      ]
    },
    user_email: {
      initial: '',
      value: '',
      readonly: false,
      rules: [
        () => this.form.user_email.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.error.required_field'),
        () => !this.form.user_email.value.match(/\s/) || this.$vuetify.lang.t('$vuetify.common.error.no_spaces'),
        () => !!this.form.user_email.value.match(emailRegexp) || this.$vuetify.lang.t('$vuetify.common.error.email_format_invalid')
      ]
    },
    user_pass: {
      initial: '',
      value: '',
      readonly: false,
      rules: [
        () => this.form.user_pass.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.error.required_field'),
        () => !this.form.user_pass.value.match(/\s/) || this.$vuetify.lang.t('$vuetify.common.error.no_spaces')
      ]
    }
  }

  mounted () {
    PlansStore.loadPlans({ limit: -1, offset: 0 })
    // устанавливает фокус на первом поле при загрузке страницы
    this.setFocusOnFirstField()
  }

  commitSelectedExpiredAtDate () {
    // @ts-expect-error
    this.$refs.expiredDateDialog.save(this.form.expired_at)
    // this.$refs.expiredDateDialog.save(this.formatDate(this.form.expired_at))
  }

  formatDate (date: string | null) {
    if (!date) {
      return null
    }

    const [year, month, day] = date.split('-')
    return `${day}.${month}.${year}`
  }

  setFocusOnFirstField () {
    this.$nextTick(() => {
      setTimeout(() => {
        // @ts-expect-error
        this.$refs.focusedField.$refs.input.focus()
      }, 0)
    })
  }

  get isSubmitButtonEnabled () {
    return Object.keys(this.form)
      .map(it => this.form[it].rules)
      .reduce((prev, current) => prev.concat(current), [])
      .map(it => ruleMessageToResult(it))
      .every(it => it)
  }

  get plans () {
    return PlansStore.plans.filter(it => it.status)
  }

  async submit () {
    try {
      this.loading.submit = true
      await TimeflowOrchestratorProvider.getInstance().createInstance({
        instance: {
          name: this.form.instance_name.value,
          db_host: this.form.db_host.value,
          db_name: this.form.db_name.value,
          db_password: this.form.db_pass.value,
          db_username: this.form.db_user.value,
          dadata_api_key: this.form.geo_key.value,
          vi_api_key: this.form.vi_key.value,
          licenses: {
            plan_id: this.form.plan.value,
            valid_until: this.form.expired_at.value
          }
        },
        user: {
          full_name: this.form.username.value,
          email: this.form.user_email.value,
          password: this.form.user_pass.value
        }
      })
      this.$router.replace(InstancesRoute)
    } catch (err) {
      // TODO (2020.11.06): Catching errors

      switch (err.response?.data?.exception?.message) {
        case 'Неверный ключ подключения к системе видеоидентификации': {
          alert(this.$vuetify.lang.t('$vuetify.pages.create_instance.error.invalid_vi_key'))
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
        this.$router.replace(InstancesRoute)
      }
    } else {
      this.$router.replace(InstancesRoute)
    }
  }
}
