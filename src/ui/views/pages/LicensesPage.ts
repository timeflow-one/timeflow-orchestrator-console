import { TableHeader } from '@/models/TableHeader'
import { TableOptions } from '@/models/TableOptions'
import { CreateLicenseRoute, LicensesRoute } from '@/router'
import AppbarMenuStore from '@/store/AppbarMenuStore'
import LicensesStore, { LicenseModel } from '@/store/LicensesStore'
import { Component, Vue } from 'vue-property-decorator'
import DataTable from '@/ui/components/DataTable.vue'

@Component({
  components: {
    DataTable
  }
})
export default class LicensesPage extends Vue {
  /// --- TABLE ---
  readonly tableHeaders: Array<TableHeader> = [
    {
      value: 'id',
      align: 'start',
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
    } finally {
      this.loading.table = false
    }
  }

  clickOnRow (item: LicenseModel) {
    // this.$router.push({
    //   ...LicensePage,
    //   params: { id: item.id.toString() }
    // })
    throw new Error('Not implemented')
  }

  onOptionsChanged (value: TableOptions) {
    this.tableOptions = value
    this.loadData((value.page - 1) * value.itemsPerPage, value.itemsPerPage)
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
