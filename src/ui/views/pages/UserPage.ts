import { UserResponse } from '@/api/responses/UserResponse'
import { TimeflowOrchestratorProvider } from '@/api/TimeflowOrchestratorProvider'
import { Role } from '@/models/Roles'
import { UsersRoute } from '@/router'
import { ruleMessageToResult } from '@/utils/ruleMessageToRule'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class UserPage extends Vue {
  form: FormItem = {
    name: {
      value: '',
      rules: [
        () => this.form.name.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.errors.required_field'),
        () => !this.form.name.value.match(/\s/) || this.$vuetify.lang.t('$vuetify.common.errors.no_spaces')
      ]
    },
    email: {
      value: '',
      rules: [
        () => this.form.email.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.errors.required_field'),
        () => !this.form.email.value.match(/\s/) || this.$vuetify.lang.t('$vuetify.common.errors.no_spaces'),
        () => !!this.form.email.value.match(new RegExp(process.env.VUE_APP_EMAIL_REGEX)) || this.$vuetify.lang.t('$vuetify.common.errors.email_format_invalid')
      ]
    },
    roles: {
      value: [],
      rules: [
        () => this.form.roles.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.errors.required_field')
      ]
    },
    instance_name: {
      value: '',
      rules: [
        () => this.form.instance_name.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.errors.required_field'),
        () => !this.form.instance_name.value.match(/\s/) || this.$vuetify.lang.t('$vuetify.common.errors.no_spaces')
      ]
    }
  }

  loading = {
    card: false,
    submit: false
  }

  user!: UserResponse

  async created () {
    try {
      this.loading.card = true

      const response = await TimeflowOrchestratorProvider
        .getInstance()
        .getUser(Number(this.$route.params.id))

      this.user = response.data

      this.form.name.value = response.data.user.full_name
      this.form.email.value = response.data.user.email
      this.form.roles.value = response.data.user.role.split(',')
      this.form.instance_name.value = response.data.user.instance.name
    } catch (err) {
      if (err.isAxiosError) {
        // TODO (2020.11.10): Error handling
        switch (err.response.status) {
          case 400: {
            alert(this.$vuetify.lang.t('$vuetify.pages.instance.errors.400'))
            this.$router.replace(UsersRoute)
          }
        }
      }
    } finally {
      this.loading.card = false
    }
  }

  cancel () {
    this.$router.replace(UsersRoute)
  }

  async submit () {
    try {
      this.loading.submit = true

      await TimeflowOrchestratorProvider
        .getInstance()
        .updateUser({
          id: this.user.user.id,
          user: {
            full_name: this.form.name.value,
            email: this.form.email.value,
            role: this.form.roles.value.join(',')
          }
        })

      this.$router.replace(UsersRoute)
    } catch (err) {
      // TODO (2020.11.10): Handling error
    } finally {
      this.loading.submit = false
    }
  }

  get isValueUpdated () {
    return this.form.name.value !== this.user.user.full_name ||
      this.form.email.value !== this.user.user.email ||
      this.form.roles.value.length !== this.user.user.role.split(',').length ||
      this.form.roles.value.some((it: string, index: number) => it !== this.user.user.role.split(',')[index]) ||
      this.form.instance_name.value !== this.user.user.instance.name
  }

  get isSubmitButtonEnabled () {
    return Object.keys(this.form)
      .map(it => this.form[it].rules)
      .reduce((prev, current) => prev.concat(current), [])
      .map(it => ruleMessageToResult(it))
      .every(it => it) && this.isValueUpdated
  }

  get roles () {
    return [
      {
        text: this.$vuetify.lang.t(`$vuetify.pages.user.roles.${Role.OWNER}`),
        value: Role.OWNER,
        disabled: false
      },
      {
        text: this.$vuetify.lang.t(`$vuetify.pages.user.roles.${Role.ADMIN}`),
        value: Role.ADMIN,
        disabled: false
      },
      {
        text: this.$vuetify.lang.t(`$vuetify.pages.user.roles.${Role.MANAGER}`),
        value: Role.MANAGER,
        disabled: false
      },
      {
        text: this.$vuetify.lang.t(`$vuetify.pages.user.roles.${Role.HR}`),
        value: Role.HR,
        disabled: false
      },
      {
        text: this.$vuetify.lang.t(`$vuetify.pages.user.roles.${Role.ANALYST}`),
        value: Role.ANALYST,
        disabled: false
      },
      {
        text: this.$vuetify.lang.t(`$vuetify.pages.user.roles.${Role.ORCHESTRATOR}`),
        value: Role.ORCHESTRATOR,
        disabled: true
      }
    ]
  }

  get isRolesEnabled () {
    return this.form.roles.value.includes(Role.ORCHESTRATOR)
  }

  get title () {
    return this.user.user.full_name
  }
}
