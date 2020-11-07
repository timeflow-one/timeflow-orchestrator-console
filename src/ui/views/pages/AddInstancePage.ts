import { InstancesRoute } from '@/router'
import PlansStore from '@/store/PlansStore'
import { Component, Vue } from 'vue-property-decorator'
import PasswordComponent from '@/ui/components/PasswordComponent.vue'
import { TimeflowOrchestratorProvider } from '@/api/TimeflowOrchestratorProvider'

@Component({
  components: {
    PasswordComponent
  }
})
export default class AddInstancePage extends Vue {
  expiredDatePickerDialog = false
  loading = false
  stepper = {
    step: 1
  }

  form = {
    instance_name: '',
    db_host: '',
    db_name: '',
    db_user: '',
    db_pass: '',
    plan: -1,
    expired_at: '',
    vi_key: '',
    geo_key: '',
    username: '',
    user_email: '',
    user_pass: ''
  }

  // step = [ field = [ rules = [] ] ]
  rules = [
    [
      // instance name
      [
        () => this.form.instance_name.length > 0
      ]
    ],
    [
      // db host
      [
        () => this.form.db_host.length > 0
      ],
      // db name
      [
        () => this.form.db_name.length > 0
      ],
      // db user
      [
        () => this.form.db_user.length > 0
      ],
      // db pass
      [
        () => this.form.db_pass.length > 0
      ]
    ],
    [
      // plan
      [
        () => this.form.plan > -1
      ],
      // expired at
      [
        () => this.form.expired_at.length > 0
      ],
      // vi key
      [
        () => this.form.vi_key.length > 0
      ],
      // geo key
      [
        () => this.form.geo_key.length > 0
      ]
    ],
    [
      // username
      [
        () => this.form.username.length > 0
      ],
      // user email
      [
        () => this.form.user_email.length > 0,
        () => !this.form.user_email.match(/\s/),
        () => !!this.form.user_email.match(new RegExp(process.env.VUE_APP_EMAIL_REGEX))
      ],
      // user pass
      [
        () => this.form.user_pass.length > 0
      ]
    ]
  ]

  rulesMessages = [
    [
      // instance name
      [
        () => this.rules[0][0][0]() || this.$vuetify.lang.t('$vuetify.common.errors.required_field')
      ]
    ],
    [
      // db host
      [
        () => this.rules[1][0][0]() || this.$vuetify.lang.t('$vuetify.common.errors.required_field')
      ],
      // db name
      [
        () => this.rules[1][1][0]() || this.$vuetify.lang.t('$vuetify.common.errors.required_field')
      ],
      // db user
      [
        () => this.rules[1][2][0]() || this.$vuetify.lang.t('$vuetify.common.errors.required_field')
      ],
      // db pass
      [
        () => this.rules[1][3][0]() || this.$vuetify.lang.t('$vuetify.common.errors.required_field')
      ]
    ],
    [
      // plan
      [
        () => this.rules[2][0][0]() || this.$vuetify.lang.t('$vuetify.common.errors.required_field')
      ],
      // expired at
      [
        () => this.rules[2][1][0]() || this.$vuetify.lang.t('$vuetify.common.errors.required_field')
      ],
      // vi key
      [
        () => this.rules[2][2][0]() || this.$vuetify.lang.t('$vuetify.common.errors.required_field')
      ],
      // geo key
      [
        () => this.rules[2][3][0]() || this.$vuetify.lang.t('$vuetify.common.errors.required_field')
      ]
    ],
    [
      // username
      [
        () => this.rules[3][0][0]() || this.$vuetify.lang.t('$vuetify.common.errors.required_field')
      ],
      // user email
      [
        () => this.rules[3][1][0]() || this.$vuetify.lang.t('$vuetify.common.errors.required_field'),
        () => this.rules[3][1][1]() || this.$vuetify.lang.t('$vuetify.login.errors.no_spaces'),
        () => this.rules[3][1][2]() || this.$vuetify.lang.t('$vuetify.login.errors.email_format_invalid')
      ],
      // user pass
      [
        () => this.rules[3][2][0]() || this.$vuetify.lang.t('$vuetify.common.errors.required_field')
      ]
    ]
  ]

  mounted () {
    PlansStore.loadPlans()
  }

  isStepButtonDisabled (step: number) {
    return !this.rules[step].every(it => it.some(rule => rule()))
  }

  stepRules (step: number) {
    return ([] as Array<() => boolean>).concat(...this.rules[step])
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

  get isConfirmButtonEnabled () {
    return this.rules.every(step => step.every(field => field.every(rule => rule())))
  }

  get plans () {
    return PlansStore.plans
  }

  async confirm () {
    try {
      this.stepper.step = 5
      this.loading = true
      await TimeflowOrchestratorProvider.getInstance().addInstance({
        instance: {
          name: this.form.instance_name,
          db_host: this.form.db_host,
          db_name: this.form.db_name,
          db_password: this.form.db_pass,
          db_username: this.form.db_user,
          dadata_api_key: this.form.geo_key,
          vi_api_key: this.form.vi_key,
          licenses: {
            plan_id: this.form.plan,
            valid_until: this.form.expired_at
          }
        },
        user: {
          full_name: this.form.username,
          email: this.form.user_email,
          password: this.form.user_pass
        }
      })
      this.$router.replace(InstancesRoute)
    } catch (err) {
      // TODO (2020.11.06): Catching errors

      switch (err.response?.data?.exception?.message) {
        case 'Неверный ключ подключения к системе видеоидентификации': {
          alert(this.$vuetify.lang.t('$vuetify.pages.add_instance.errors.invalid_vi_key'))
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
