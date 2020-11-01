import { Component, Vue } from 'vue-property-decorator'

@Component
export default class LoginForm extends Vue {
  protected readonly login = ''
  protected readonly password = ''
  protected readonly isFormValid = false
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

  protected submit () {
    // TODO (2020.11.01): Submit login
    // --- TEMP ---
    this.loadingState = true
    setTimeout(() => {
      this.$refs.form.reset()
      this.loadingState = false

      this.$router.replace({ name: 'blank' })
    }, 1500)
    // --- TEMP ---
    throw new Error('Not implemented')
  }
}
