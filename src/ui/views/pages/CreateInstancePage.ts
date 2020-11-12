import { InstancesRoute } from '@/router'
import { Component, Vue } from 'vue-property-decorator'
import PasswordComponent from '@/ui/components/PasswordComponent.vue'
import { TimeflowOrchestratorProvider } from '@/api/TimeflowOrchestratorProvider'
import { ruleMessageToResult, ruleMessageToRule } from '@/utils/ruleMessageToRule'
import PlansStore from '@/store/PlansStore'
import { emailRegex as emailRegexp } from '@/utils/EmailRegex'

@Component({
  components: {
    PasswordComponent
  }
})
export default class CreateInstancePage extends Vue {
  expiredDatePickerDialog = false
  loading = false
  readonly stepper = {
    step: 1,
    limit: 4
  }

  readonly form: FormItem = {
    instance_name: {
      value: '',
      rules: [
        () => this.form.instance_name.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.error.required_field'),
        () => !this.form.instance_name.value.match(/\s/) || this.$vuetify.lang.t('$vuetify.common.error.no_spaces')
      ]
    },
    db_host: {
      value: '',
      rules: [
        () => this.form.db_host.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.error.required_field'),
        () => !this.form.db_host.value.match(/\s/) || this.$vuetify.lang.t('$vuetify.common.error.no_spaces')
      ]
    },
    db_name: {
      value: '',
      rules: [
        () => this.form.db_name.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.error.required_field'),
        () => !this.form.db_name.value.match(/\s/) || this.$vuetify.lang.t('$vuetify.common.error.no_spaces')
      ]
    },
    db_user: {
      value: '',
      rules: [
        () => this.form.db_user.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.error.required_field'),
        () => !this.form.db_user.value.match(/\s/) || this.$vuetify.lang.t('$vuetify.common.error.no_spaces')
      ]
    },
    db_pass: {
      value: '',
      rules: [
        () => this.form.db_pass.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.error.required_field'),
        () => !this.form.db_pass.value.match(/\s/) || this.$vuetify.lang.t('$vuetify.common.error.no_spaces')
      ]
    },
    plan: {
      value: -1,
      rules: [
        () => this.form.plan.value > -1 || this.$vuetify.lang.t('$vuetify.common.error.required_field')
      ]
    },
    expired_at: {
      value: '',
      rules: [
        () => this.form.expired_at.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.error.required_field'),
        () => !this.form.expired_at.value.match(/\s/) || this.$vuetify.lang.t('$vuetify.common.error.no_spaces')
      ]
    },
    vi_key: {
      value: '',
      rules: [
        () => this.form.vi_key.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.error.required_field'),
        () => !this.form.vi_key.value.match(/\s/) || this.$vuetify.lang.t('$vuetify.common.error.no_spaces')
      ]
    },
    geo_key: {
      value: '',
      rules: [
        () => this.form.geo_key.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.error.required_field'),
        () => !this.form.geo_key.value.match(/\s/) || this.$vuetify.lang.t('$vuetify.common.error.no_spaces')
      ]
    },
    username: {
      value: '',
      rules: [
        () => this.form.username.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.error.required_field'),
        () => !this.form.username.value.match(/\s/) || this.$vuetify.lang.t('$vuetify.common.error.no_spaces')
      ]
    },
    user_email: {
      value: '',
      rules: [
        () => this.form.user_email.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.error.required_field'),
        () => !this.form.user_email.value.match(/\s/) || this.$vuetify.lang.t('$vuetify.common.error.no_spaces'),
        () => !!this.form.user_email.value.match(emailRegexp) || this.$vuetify.lang.t('$vuetify.common.error.email_format_invalid')
      ]
    },
    user_pass: {
      value: '',
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

  isStepButtonEnabled (step: number) {
    switch (step) {
      case 1:
        return this.form.instance_name.rules.every(it => ruleMessageToResult(it))

      case 2:
        return this.form.db_host.rules.every(it => ruleMessageToResult(it)) &&
          this.form.db_name.rules.every(it => ruleMessageToResult(it)) &&
          this.form.db_user.rules.every(it => ruleMessageToResult(it)) &&
          this.form.db_pass.rules.every(it => ruleMessageToResult(it))

      case 3:
        return this.form.plan.rules.every(it => ruleMessageToResult(it)) &&
          this.form.expired_at.rules.every(it => ruleMessageToResult(it)) &&
          this.form.vi_key.rules.every(it => ruleMessageToResult(it)) &&
          this.form.geo_key.rules.every(it => ruleMessageToResult(it))

      case 4:
        return this.form.username.rules.every(it => ruleMessageToResult(it)) &&
          this.form.user_email.rules.every(it => ruleMessageToResult(it)) &&
          this.form.user_pass.rules.every(it => ruleMessageToResult(it))

      default:
        return false
    }
  }

  stepRules (step: number): Array<() => boolean> {
    switch (step) {
      case 1:
        return [
          ...this.form.instance_name.rules
        ].map(it => ruleMessageToRule(it))

      case 2:
        return [
          ...this.form.db_host.rules,
          ...this.form.db_name.rules,
          ...this.form.db_user.rules,
          ...this.form.db_pass.rules
        ].map(it => ruleMessageToRule(it))

      case 3:
        return [
          ...this.form.plan.rules,
          ...this.form.expired_at.rules,
          ...this.form.vi_key.rules,
          ...this.form.geo_key.rules
        ].map(it => ruleMessageToRule(it))

      case 4:
        return [
          ...this.form.username.rules,
          ...this.form.user_email.rules,
          ...this.form.user_pass.rules
        ].map(it => ruleMessageToRule(it))

      default:
        return []
    }
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
      this.stepper.step = 5
      this.loading = true
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
          alert(this.$vuetify.lang.t('$vuetify.pages.add_instance.error.invalid_vi_key'))
          this.stepper.step = 3
          break
        }

        default: {
          alert(err.response?.data?.exception?.message || err.message)
        }
      }
    } finally {
      this.loading = false
    }
  }

  cancel () {
    this.$router.replace(InstancesRoute)
  }
}
