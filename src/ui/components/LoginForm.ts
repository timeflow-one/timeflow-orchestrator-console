import { Component, Vue } from 'vue-property-decorator'

@Component
export default class LoginForm extends Vue {
  protected readonly login = ''
  protected readonly password = ''
  protected readonly formValid = false
  protected isShowPass = false
  protected loadingState = false
  protected readonly loginRules: Array<Rule> = [
    (value) => value.length > 0 || this.$vuetify.lang.t('$vuetify.login.errors.empty_field'),
    (value) => !value.match(/\s/) || this.$vuetify.lang.t('$vuetify.login.errors.no_spaces'),
    (value) => !!value.match(new RegExp(process.env.VUE_APP_EMAIL_REGEX)) || this.$vuetify.lang.t('$vuetify.login.errors.email_format_invalid')
  ]

  protected readonly passwordRules: Array<Rule> = [
    (value) => value.length > 0 || this.$vuetify.lang.t('$vuetify.login.errors.empty_field'),
    (value) => !value.match(/\s/) || this.$vuetify.lang.t('$vuetify.login.errors.no_spaces')
  ]

  get submitButtonHasAvailable () {
    return this.formValid
  }

  protected submit () {
    this.loadingState = true
    setTimeout(() => { this.loadingState = false }, 1500)
    // this.$refs.form.reset()
    // TODO (2020.11.01): Submit login
    throw new Error('Not implemented')
  }
}
