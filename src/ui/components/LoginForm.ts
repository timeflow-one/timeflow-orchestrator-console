import { InstancesRoute } from '@/router'
import AuthStore from '@/store/AuthStore'
import EnrollmentsStore from '@/store/EnrollmentsStore'
import { emailRegex } from '@/utils/EmailRegex'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class LoginForm extends Vue {
  readonly login = ''
  readonly password = ''
  readonly isFormValid = false
  isShowPass = false
  loadingState = false
  readonly loginRules: Array<Rule> = [
    (value) => value.length > 0 || this.$vuetify.lang.t('$vuetify.login.error.empty_field'),
    (value) => !value.match(/\s/) || this.$vuetify.lang.t('$vuetify.login.error.no_spaces'),
    (value) => !!value.match(emailRegex) || this.$vuetify.lang.t('$vuetify.login.error.email_format_invalid')
  ]

  readonly passwordRules: Array<Rule> = [
    (value) => value.length > 0 || this.$vuetify.lang.t('$vuetify.login.error.empty_field'),
    (value) => !value.match(/\s/) || this.$vuetify.lang.t('$vuetify.login.error.no_spaces')
  ]

  async submit () {
    try {
      this.loadingState = true

      await AuthStore.signIn({ login: this.login, password: this.password })
      this.$router.replace({ name: InstancesRoute.name })
      // загрузка количества заявок на создание аккаунта для меню навигации
      EnrollmentsStore.loadEnrollments({ offset: 0, limit: 0 })
    } catch (err) {
      console.error(err)

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
