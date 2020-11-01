import { Component, Vue } from 'vue-property-decorator'

@Component
export default class LoginForm extends Vue {
  protected readonly login = ''
  protected readonly password = ''
  protected readonly isValid = false
  protected isShowPass = false
  protected readonly loginRules: Array<Rule> = [
    (value) => !!value.match(new RegExp(process.env.VUE_APP_EMAIL_REGEX)) || this.$vuetify.lang.t('$vuetify.login.errors.email_format_invalid')
  ]

  protected submit () {
    // TODO (2020.11.01): Submit login
    throw new Error('Not implemented')
  }
}
