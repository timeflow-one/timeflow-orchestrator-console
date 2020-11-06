import { InstancesRoute } from '@/router'
import PlansStore from '@/store/PlansStore'
import { Component, Vue } from 'vue-property-decorator'
import PasswordComponent from '@/ui/components/PasswordComponent.vue'

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
        () => this.form.instance_name !== ''
      ]
    ],
    [
      // db host
      [
        () => this.form.db_host !== ''
      ],
      // db name
      [
        () => this.form.db_name !== ''
      ],
      // db user
      [
        () => this.form.db_user !== ''
      ],
      // db pass
      [
        () => this.form.db_pass !== ''
      ]
    ],
    [
      // plan
      [
        () => this.form.plan !== -1
      ],
      // expired at
      [
        () => this.form.expired_at !== ''
      ],
      // vi key
      [
        () => this.form.vi_key !== ''
      ],
      // geo key
      [
        () => this.form.geo_key !== ''
      ]
    ],
    [
      // username
      [
        () => this.form.username !== ''
      ],
      // user email
      [
        () => this.form.user_email !== ''
      ],
      // user pass
      [
        () => this.form.user_pass !== ''
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
        () => this.rules[3][1][0]() || this.$vuetify.lang.t('$vuetify.common.errors.required_field')
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
    this.$refs.expiredDateDialog.save(this.formatDate(this.form.expired_at))
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

  confirm () {
    this.stepper.step = 5
    this.loading = true
    // this.$router.replace(InstancesRoute)
  }

  cancel () {
    this.$router.replace(InstancesRoute)
  }
}
