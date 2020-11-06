import { InstancesRoute } from '@/router'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AddInstancePage extends Vue {
  stepper = {
    step: 0
  }

  form = {
    instance_name: '',
    db_host: '',
    db_name: '',
    db_user: '',
    db_pass: '',
    plan: '', // TODO (2020.11.06): change to select
    expired_at: '',
    vi_key: '',
    geo_key: ''
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
        () => this.form.plan !== ''
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
        () => this.rules[1][1][0]() || this.$vuetify.lang.t('$vuetify.common.errors.required_field')
      ],
      // db pass
      [
        () => this.rules[1][1][0]() || this.$vuetify.lang.t('$vuetify.common.errors.required_field')
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
        () => this.rules[2][1][0]() || this.$vuetify.lang.t('$vuetify.common.errors.required_field')
      ],
      // geo key
      [
        () => this.rules[2][1][0]() || this.$vuetify.lang.t('$vuetify.common.errors.required_field')
      ]
    ]
  ]

  isStepButtonDisabled (step: number) {
    return !this.rules[step].every(it => it.some(rule => rule()))
  }

  stepRules (step: number) {
    return ([] as Array<() => boolean>).concat(...this.rules[step])
  }

  get isConfirmButtonEnabled () {
    return false
  }

  confirm () {
    this.$router.replace(InstancesRoute)
  }

  cancel () {
    this.$router.replace(InstancesRoute)
  }
}
