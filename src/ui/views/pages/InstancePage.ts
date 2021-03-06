import { InstancesRoute } from '@/router'
import { Component, Vue } from 'vue-property-decorator'
import PasswordComponent from '@/ui/components/PasswordComponent.vue'
import { ruleMessageToResult } from '@/utils/ruleMessageToRule'
import { TimeflowOrchestratorProvider } from '@/api/TimeflowOrchestratorProvider'
import { InstanceResponse } from '@/api/responses/InstanceResponse'
import { Formable } from './interfaces/Formable'

@Component({
  components: {
    PasswordComponent
  }
})
export default class InstancePage extends Vue implements Formable {
  readonly form: FormItem = {
    instance_name: {
      initial: '',
      value: '',
      readonly: false,
      rules: [
        () => this.form.instance_name.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.error.required_field')
      ]
    },
    db_host: {
      initial: '',
      value: '',
      readonly: true,
      rules: [
        () => this.form.db_host.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.error.required_field'),
        () => !this.form.db_host.value.match(/\s/) || this.$vuetify.lang.t('$vuetify.common.error.no_spaces')
      ]
    },
    db_name: {
      initial: '',
      value: '',
      readonly: true,
      rules: [
        () => this.form.db_name.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.error.required_field'),
        () => !this.form.db_name.value.match(/\s/) || this.$vuetify.lang.t('$vuetify.common.error.no_spaces')
      ]
    },
    db_user: {
      initial: '',
      value: '',
      readonly: true,
      rules: [
        () => this.form.db_user.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.error.required_field'),
        () => !this.form.db_user.value.match(/\s/) || this.$vuetify.lang.t('$vuetify.common.error.no_spaces')
      ]
    },
    db_pass: {
      initial: '',
      value: '',
      readonly: true,
      rules: [
        () => this.form.db_pass.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.error.required_field'),
        () => !this.form.db_pass.value.match(/\s/) || this.$vuetify.lang.t('$vuetify.common.error.no_spaces')
      ]
    }
    // vi_key: {
    //   initial: '',
    //   value: '',
    //   readonly: false,
    //   rules: [
    //     () => this.form.vi_key.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.error.required_field'),
    //     () => !this.form.vi_key.value.match(/\s/) || this.$vuetify.lang.t('$vuetify.common.error.no_spaces')
    //   ]
    // },
    // geo_key: {
    //   initial: '',
    //   value: '',
    //   readonly: false,
    //   rules: [
    //     () => this.form.geo_key.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.error.required_field'),
    //     () => !this.form.geo_key.value.match(/\s/) || this.$vuetify.lang.t('$vuetify.common.error.no_spaces')
    //   ]
    // }
  }

  readonly loading = {
    card: false,
    submit: false,
    remove: false
  }

  instance!: InstanceResponse

  async created () {
    try {
      this.loading.card = true

      const response = await TimeflowOrchestratorProvider
        .getInstance()
        .getInstance(Number(this.$route.params.id))

      this.instance = response.data

      this.form.instance_name.value = response.data.instance.name
      this.form.instance_name.initial = this.form.instance_name.value
      this.form.db_host.value = response.data.instance.db_host
      this.form.db_host.initial = this.form.db_host.value
      this.form.db_name.value = response.data.instance.db_name
      this.form.db_name.initial = this.form.db_name.value
      this.form.db_user.value = response.data.instance.db_username
      this.form.db_user.initial = this.form.db_user.value
      this.form.db_pass.value = response.data.instance.db_password
      this.form.db_pass.initial = this.form.db_pass.value
      // this.form.vi_key.value = response.data.instance.vi_api_key
      // this.form.vi_key.initial = this.form.vi_key.value
      // this.form.geo_key.value = response.data.instance.dadata_api_key
      // this.form.geo_key.initial = this.form.geo_key.value
    } catch (err) {
      console.error(err)

      if (err.isAxiosError) {
        // TODO (2020.11.10): Error handling
        switch (err.response.status) {
          case 400: {
            alert(this.$vuetify.lang.t('$vuetify.pages.instance.error.400'))
            this.$router.replace(InstancesRoute)
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
        this.$router.replace(InstancesRoute)
      }
    } else {
      this.$router.replace(InstancesRoute)
    }
  }

  async submit () {
    try {
      this.loading.submit = true

      await TimeflowOrchestratorProvider
        .getInstance()
        .updateInstance({
          id: this.instance.instance.id,
          instance: {
            name: this.form.instance_name.value
            // db_host: this.form.db_host.value,
            // db_name: this.form.db_name.value,
            // db_username: this.form.db_user.value,
            // db_password: this.form.db_pass.value,
            // vi_api_key: this.form.vi_key.value,
            // dadata_api_key: this.form.geo_key.value
          }
        })

      this.$router.replace(InstancesRoute)
    } catch (err) {
      console.error(err)

      // TODO (2020.11.10): Handling error
    } finally {
      this.loading.submit = false
    }
  }

  async remove () {
    try {
      this.loading.remove = true
      const isMustBeRemoved = confirm(this.$vuetify.lang.t('$vuetify.pages.instance.label.confirm_remove', this.title))

      if (isMustBeRemoved) {
        await TimeflowOrchestratorProvider
          .getInstance()
          .removeInstance(this.instance.instance.id)

        this.$router.replace(InstancesRoute)
      }
    } catch (err) {
      console.error(err)

      // TODO (2020.11.10): Handling error
    } finally {
      this.loading.remove = false
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

  get title () {
    return this.instance.instance.name
  }
}
