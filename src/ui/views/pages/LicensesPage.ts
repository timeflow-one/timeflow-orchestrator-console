import { TableHeader } from '@/models/TableHeader'
import { TableOptions } from '@/models/TableOptions'
import { CreateLicenseRoute, LicenseRoute, LicensesRoute } from '@/router'
import AppbarMenuStore from '@/store/AppbarMenuStore'
import LicensesStore, { LicenseModel } from '@/store/LicensesStore'
import { Component, Vue } from 'vue-property-decorator'
import DataTable from '@/ui/components/DataTable.vue'
import CodeComponent from '@/ui/components/CodeComponent.vue'
import { TimeflowOrchestratorProvider } from '@/api/TimeflowOrchestratorProvider'
import { Tableable } from './interfaces/Tableable'
import { AxiosError } from 'axios'

@Component({
  components: {
    DataTable,
    CodeComponent
  }
})
export default class LicensesPage extends Vue implements Tableable<LicenseModel> {
  /// --- TABLE ---
  readonly tableHeaders: Array<TableHeader> = [
    {
      value: 'id',
      align: 'end',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.licenses.table.header.0'),
      width: '6%'
    },
    {
      value: 'instance',
      align: 'start',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.licenses.table.header.1'),
      width: '22%'
    },
    {
      value: 'plan',
      align: 'start',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.licenses.table.header.2'),
      width: '15%'
    },
    {
      value: 'created_at',
      align: 'start',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.licenses.table.header.3'),
      width: '15%'
    },
    {
      value: 'expited_at',
      align: 'start',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.licenses.table.header.4'),
      width: '15%'
    },
    {
      value: 'status',
      align: 'center',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.licenses.table.header.5'),
      width: '15%'
    },
    {
      value: 'actions',
      align: 'center',
      text: this.$vuetify.lang.t('$vuetify.pages.licenses.table.header.6'),
      width: '10%'
    }
  ]

  readonly loading = {
    table: false
  }

  tableOptions!: TableOptions
  /// --- END TABLE ---

  mounted () {
    // добавляет кнопку меню в toolbar
    AppbarMenuStore.setItems([{
      title: this.$vuetify.lang.t('$vuetify.pages.licenses.action.add'),
      icon: 'mdi-clipboard-plus-outline',
      action: () => {
        this.$router.push(CreateLicenseRoute)
      }
    }])

    // обновляем данные после возвращения на страницу
    this.$router.afterEach((to) => {
      if (to.name === LicensesRoute.name) {
        this.loadData((this.tableOptions.page - 1) * this.tableOptions.itemsPerPage, this.tableOptions.itemsPerPage)
      }
    })
  }

  beforeDestroy () {
    AppbarMenuStore.clean()
  }

  async loadData (offset: number, limit: number) {
    try {
      this.loading.table = true
      await LicensesStore.loadLicenses({ offset, limit })
    } catch (err) {
      console.error(err)

      if ((err as AxiosError).isAxiosError) {
        switch ((err as AxiosError).code) {
          default: {
            alert('Ошибка получения списка подписок')
          }
        }
      }
    } finally {
      this.loading.table = false
    }
  }

  clickOnRow (item: LicenseModel) {
    this.$router.push({
      ...LicenseRoute,
      params: { id: item.id.toString() }
    })
  }

  clickOutsideSubpage () {
    // @ts-expect-error
    this.$refs.subpage.cancel()
  }

  onOptionsChanged (value: TableOptions) {
    this.tableOptions = value
    this.loadData((value.page - 1) * value.itemsPerPage, value.itemsPerPage)
  }

  async promisePayment (item: LicenseModel) {
    try {
      const acceptPromisePayment = confirm(this.$vuetify.lang.t('$vuetify.pages.licenses.action.give_promise_payment', item.id))

      if (acceptPromisePayment) {
        await TimeflowOrchestratorProvider
          .getInstance()
          .promisePayment(item.id)

        await this.loadData((this.tableOptions.page - 1) * this.tableOptions.itemsPerPage, this.tableOptions.itemsPerPage)
      }
    } catch (err) {
      console.error(err)

      // TODO (2020.11.27): Catching exceptions
    }
  }

  get tableItems () {
    return LicensesStore.licenses
  }

  get totalItems () {
    return LicensesStore.totalLicenses
  }

  get isSubpage () {
    return LicensesRoute.children?.some(it => it.name === this.$route.name)
  }
}
