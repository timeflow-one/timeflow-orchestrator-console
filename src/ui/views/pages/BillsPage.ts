import { Component, Vue } from 'vue-property-decorator'
import DataTable from '@/ui/components/DataTable.vue'
import { Tableable } from './interfaces/Tableable'
import BillsStore, { BillModel } from '@/store/BillsStore'
import { TableHeader } from '@/models/TableHeader'
import { TableOptions } from '@/models/TableOptions'
import { BillsRoute } from '@/router'

@Component({
  components: {
    DataTable
  }
})
export default class BillsPage extends Vue implements Tableable<BillModel> {
  readonly tableHeaders: Array<TableHeader> = [
    {
      value: 'id',
      align: 'end',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.bills.table.header.0'),
      width: '6%'
    },
    {
      value: 'transaction_no',
      align: 'start',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.bills.table.header.1'),
      width: '22%'
    },
    {
      value: 'to_pay_on',
      align: 'start',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.bills.table.header.2'),
      width: '15%'
    },
    {
      value: 'created_at',
      align: 'start',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.bills.table.header.3'),
      width: '15%'
    },
    {
      value: 'legal_title',
      align: 'start',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.bills.table.header.4'),
      width: '15%'
    },
    {
      value: 'inn',
      align: 'start',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.bills.table.header.5'),
      width: '15%'
    },
    {
      value: 'kpp',
      align: 'start',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.bills.table.header.6'),
      width: '15%'
    },
    {
      value: 'plan_id',
      align: 'start',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.bills.table.header.7'),
      width: '15%'
    }
  ]

  readonly loading = {
    table: false
  }

  tableOptions!: TableOptions

  mounted () {
    // обновляем данные после возвращения на страницу
    this.$router.afterEach((to) => {
      if (to.name === BillsRoute.name) {
        this.loadData((this.tableOptions.page - 1) * this.tableOptions.itemsPerPage, this.tableOptions.itemsPerPage)
      }
    })
  }

  async loadData (offset: number, limit: number) {
    try {
      this.loading.table = true
      await BillsStore.loadBills({ offset, limit })
    } catch (err) {
      console.error(err)
    } finally {
      this.loading.table = false
    }
  }

  onOptionsChanged (value: TableOptions) {
    this.tableOptions = value
    this.loadData((value.page - 1) * value.itemsPerPage, value.itemsPerPage)
  }

  clickOnRow (item: BillModel) {
    return null
  }

  clickOutsideSubpage () {
    // @ts-expect-error
    this.$refs.subpage.cancel()
  }

  get tableItems () {
    return BillsStore.bills
  }

  get totalItems () {
    return BillsStore.totalBills
  }

  get isSubpage () {
    return BillsRoute.children?.some(it => it.name === this.$route.name)
  }
}
