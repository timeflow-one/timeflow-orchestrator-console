import { InstancesRoute } from '@/router'
import InstancesPageStore from '@/store/InstancesPageStore'
import { Component, Vue } from 'vue-property-decorator'
import PasswordComponent from '@/ui/components/PasswordComponent.vue'
import { ruleMessageToResult } from '@/utils/ruleMessageToRule'
import { TimeflowOrchestratorProvider } from '@/api/TimeflowOrchestratorProvider'

@Component({
  components: {
    PasswordComponent
  }
})
export default class InstancePage extends Vue {
  form: FormItem = {
    instance_name: {
      value: '',
      rules: [
        () => this.form.instance_name.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.errors.required_field'),
        () => !this.form.instance_name.value.match(/\s/) || this.$vuetify.lang.t('$vuetify.common.errors.no_spaces')
      ]
    },
    db_host: {
      value: '',
      rules: [
        () => this.form.db_host.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.errors.required_field'),
        () => !this.form.db_host.value.match(/\s/) || this.$vuetify.lang.t('$vuetify.common.errors.no_spaces')
      ]
    },
    db_name: {
      value: '',
      rules: [
        () => this.form.db_name.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.errors.required_field'),
        () => !this.form.db_name.value.match(/\s/) || this.$vuetify.lang.t('$vuetify.common.errors.no_spaces')
      ]
    },
    db_user: {
      value: '',
      rules: [
        () => this.form.db_user.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.errors.required_field'),
        () => !this.form.db_user.value.match(/\s/) || this.$vuetify.lang.t('$vuetify.common.errors.no_spaces')
      ]
    },
    db_pass: {
      value: '',
      rules: [
        () => this.form.db_pass.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.errors.required_field'),
        () => !this.form.db_pass.value.match(/\s/) || this.$vuetify.lang.t('$vuetify.common.errors.no_spaces')
      ]
    },
    vi_key: {
      value: '',
      rules: [
        () => this.form.vi_key.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.errors.required_field'),
        () => !this.form.vi_key.value.match(/\s/) || this.$vuetify.lang.t('$vuetify.common.errors.no_spaces')
      ]
    },
    geo_key: {
      value: '',
      rules: [
        () => this.form.geo_key.value.length > 0 || this.$vuetify.lang.t('$vuetify.common.errors.required_field'),
        () => !this.form.geo_key.value.match(/\s/) || this.$vuetify.lang.t('$vuetify.common.errors.no_spaces')
      ]
    }
  }

  loading = {
    confirm: false,
    remove: false
  }

  get currentInstance () {
    return InstancesPageStore.instances.find(it => it.id === Number(this.$route.params.id))!!
  }

  mounted () {
    if (!this.currentInstance) {
      this.$router.replace(InstancesRoute)
    }

    this.form.instance_name.value = this.currentInstance.name || ''
    this.form.db_host.value = this.currentInstance.db.db_host || ''
    this.form.db_name.value = this.currentInstance.db.db_name || ''
    this.form.db_user.value = this.currentInstance.db.db_user || ''
    this.form.db_pass.value = this.currentInstance.db.db_pass || ''
    this.form.vi_key.value = this.currentInstance.vi_key || ''
    this.form.geo_key.value = this.currentInstance.geo_key || ''
  }

  cancel () {
    this.$router.replace(InstancesRoute)
  }

  async confirm () {
    // TODO (2020.11.10): Updated
  }

  async remove () {
    try {
      this.loading.remove = true
      const isMustBeRemoved = confirm(this.$vuetify.lang.t('$vuetify.pages.instance.titles.confirm_remove', this.title))

      if (isMustBeRemoved) {
        await TimeflowOrchestratorProvider
          .getInstance()
          .removeInstance(this.currentInstance.id)
        this.$router.replace(InstancesRoute)
      }
    } catch (err) {
      // TODO (2020.11.10): Handling error
    } finally {
      this.loading.remove = false
    }
  }

  get isValueUpdated () {
    return this.form.instance_name.value !== this.currentInstance.name ||
      this.form.db_host.value !== this.currentInstance.db.db_host ||
      this.form.db_name.value !== this.currentInstance.db.db_name ||
      this.form.db_user.value !== this.currentInstance.db.db_user ||
      this.form.db_pass.value !== this.currentInstance.db.db_pass ||
      this.form.vi_key.value !== this.currentInstance.vi_key ||
      this.form.geo_key.value !== this.currentInstance.geo_key
  }

  get isConfirmButtonEnabled () {
    return Object.keys(this.form)
      .map(it => this.form[it].rules)
      .reduce((prev, current) => prev.concat(current), [])
      .map(it => ruleMessageToResult(it))
      .every(it => it) && this.isValueUpdated
  }

  get title () {
    return this.currentInstance.name
  }
}
