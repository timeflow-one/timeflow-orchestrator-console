import { UserResponse } from '@/api/responses/UserResponse'
import { TimeflowOrchestratorProvider } from '@/api/TimeflowOrchestratorProvider'
import { Role } from '@/models/Roles'
import { UsersRoute } from '@/router'
import { emailRegex } from '@/utils/EmailRegex'
import { ruleMessageToResult } from '@/utils/ruleMessageToRule'
import { Component, Vue } from 'vue-property-decorator'
import { Formable } from './interfaces/Formable'

@Component
export default class UserPage extends Vue implements Formable {
  readonly form: FormItem = {
    name: {
      initial: '',
      value: '',
      readonly: false,
      rules: [
        () => this.form.name.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.error.required_field')
      ]
    },
    email: {
      initial: '',
      value: '',
      readonly: false,
      rules: [
        () => this.form.email.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.error.required_field'),
        () => !this.form.email.value.match(/\s/) || this.$vuetify.lang.t('$vuetify.common.error.no_spaces'),
        () => !!this.form.email.value.match(emailRegex) || this.$vuetify.lang.t('$vuetify.common.error.email_format_invalid')
      ]
    },
    roles: {
      initial: [],
      value: [],
      readonly: false,
      rules: [
        () => this.form.roles.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.error.required_field')
      ]
    },
    instance_name: {
      initial: '',
      value: '',
      readonly: true,
      rules: [
        () => this.form.instance_name.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.error.required_field')
      ]
    }
  }

  readonly loading = {
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
      this.form.name.initial = this.form.name.value
      this.form.email.value = response.data.user.email
      this.form.email.initial = this.form.email.value
      this.form.roles.value = response.data.user.role.split(',')
      this.form.roles.initial = this.form.roles.value
      this.form.instance_name.value = response.data.user.instance.name
      this.form.instance_name.initial = this.form.instance_name.value
    } catch (err) {
      console.error(err)

      if (err.isAxiosError) {
        // TODO (2020.11.10): Error handling
        switch (err.response.status) {
          case 400: {
            alert(this.$vuetify.lang.t('$vuetify.pages.instance.error.400'))
            this.$router.replace(UsersRoute)
          }
        }
      }
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
        this.$router.replace(UsersRoute)
      }
    } else {
      this.$router.replace(UsersRoute)
    }
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
      console.error(err)

      // TODO (2020.11.10): Handling error
    } finally {
      this.loading.submit = false
    }
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

  get roles () {
    return [
      {
        text: this.$vuetify.lang.t(`$vuetify.timeflow.roles.${Role.OWNER}`),
        value: Role.OWNER,
        readonly: false,
        disabled: false
      },
      {
        text: this.$vuetify.lang.t(`$vuetify.timeflow.roles.${Role.ADMIN}`),
        value: Role.ADMIN,
        readonly: false,
        disabled: false
      },
      {
        text: this.$vuetify.lang.t(`$vuetify.timeflow.roles.${Role.MANAGER}`),
        value: Role.MANAGER,
        readonly: false,
        disabled: false
      },
      {
        text: this.$vuetify.lang.t(`$vuetify.timeflow.roles.${Role.HR}`),
        value: Role.HR,
        readonly: false,
        disabled: false
      },
      {
        text: this.$vuetify.lang.t(`$vuetify.timeflow.roles.${Role.ANALYST}`),
        value: Role.ANALYST,
        readonly: false,
        disabled: false
      },
      {
        text: this.$vuetify.lang.t(`$vuetify.timeflow.roles.${Role.ORCHESTRATOR}`),
        value: Role.ORCHESTRATOR,
        readonly: false,
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
