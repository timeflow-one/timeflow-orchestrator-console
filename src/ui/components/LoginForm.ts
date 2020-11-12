import { InstancesRoute } from '@/router'
import AuthStore from '@/store/AuthStore'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class LoginForm extends Vue {
  protected readonly login = ''
  protected readonly password = ''
  protected readonly isFormValid = false
  protected isShowPass = false
  protected loadingState = false
  protected readonly loginRules: Array<Rule> = [
    (value) => value.length > 0 || this.$vuetify.lang.t('$vuetify.login.error.empty_field'),
    (value) => !value.match(/\s/) || this.$vuetify.lang.t('$vuetify.login.error.no_spaces'),
    (value) => !!value.match(new RegExp(process.env.VUE_APP_EMAIL_REGEX)) || this.$vuetify.lang.t('$vuetify.login.error.email_format_invalid')
  ]

  protected readonly passwordRules: Array<Rule> = [
    (value) => value.length > 0 || this.$vuetify.lang.t('$vuetify.login.error.empty_field'),
    (value) => !value.match(/\s/) || this.$vuetify.lang.t('$vuetify.login.error.no_spaces')
  ]

  protected async submit () {
    try {
      this.loadingState = true

      await AuthStore.signIn({ login: this.login, password: this.password })
      this.$router.replace({ name: InstancesRoute.name })
    } catch (err) {
      switch (err?.response?.data?.exception?.message) {
        case 'Incorrect email or password passed': {
          alert('Неверный логин или пароль, повторите ввод')
          break
        }

        default: {
          alert(err.message)
        }
      }
    } finally {
      this.loadingState = false
    }
  }
}
