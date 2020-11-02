import { TimeflowOrchestratorProvider } from '@/api/TimeflowOrchestratorProvider'
import { TableHeader } from '@/models/TableHeader'
import { TableOptions } from '@/models/TableOptions'
import { Component, Vue, Watch } from 'vue-property-decorator'
import SearchField from '@/ui/components/SearchField.vue'

@Component({
  components: {
    SearchField
  }
})
export default class InstancesPage extends Vue {
  protected tableLoading = false
  protected readonly tableHeaders: Array<TableHeader> = [
    {
      value: 'id',
      align: 'start',
      sortable: false,
      text: this.$vuetify.lang.t('$vuetify.pages.instances.table.headers[0]'),
      width: '6%'
    },
    {
      value: 'name',
      align: 'start',
      sortable: false,
      text: this.$vuetify.lang.t('$vuetify.pages.instances.table.headers[1]'),
      width: '22%'
    },
    {
      value: 'limit',
      align: 'center',
      sortable: false,
      text: this.$vuetify.lang.t('$vuetify.pages.instances.table.headers[2]'),
      width: '15%'
    },
    {
      value: 'count',
      align: 'center',
      sortable: false,
      text: this.$vuetify.lang.t('$vuetify.pages.instances.table.headers[3]'),
      width: '15%'
    },
    {
      value: 'created_at',
      align: 'start',
      sortable: false,
      text: this.$vuetify.lang.t('$vuetify.pages.instances.table.headers[4]'),
      width: '15%'
    },
    {
      value: 'expires_at',
      align: 'start',
      sortable: false,
      text: this.$vuetify.lang.t('$vuetify.pages.instances.table.headers[5]'),
      width: '18%'
    },
    {
      value: 'state',
      align: 'center',
      sortable: false,
      text: this.$vuetify.lang.t('$vuetify.pages.instances.table.headers[6]'),
      width: '13%'
    }
  ]

  protected readonly tableOptions: Partial<TableOptions> = {}
  protected tableData: Array<InstanceTableItem> = []
  protected totalItemsCount = 0
  /// --- FILTERS ---
  protected filterQuery = ''
  /// --- END FILTERS ---

  async loadInstancesList (search: string, offset: number, limit: number) {
    const response = await TimeflowOrchestratorProvider
      .getInstance()
      .instances(search, offset, limit)

    this.totalItemsCount = response.data.count

    const instances = response.data.instances.map((item) => {
      const createdAt = new Date(item.created_at)
      const expiresAt = new Date(item.created_at)
      expiresAt.setDate(expiresAt.getDate() + item.stats.license.duration)

      return {
        id: item.id,
        name: item.name,
        limit: item.stats.employees.licensed,
        count: item.stats.employees.active,
        created_at: createdAt.toLocaleDateString(),
        expires_at: expiresAt.toLocaleDateString(),
        state: item.requires_upgrade
      }
    })

    this.tableData = instances
  }

  get pageText () {
    // @ts-expect-error
    return this.$vuetify.lang.t('$vuetify.common.table.page', this.tableOptions.page, Math.ceil(this.totalItemsCount / this.tableOptions.itemsPerPage), this.totalItemsCount)
  }

  get isClearFiltersButtonEnable () {
    return this.filterQuery !== ''
  }

  clearFilters () {
    this.filterQuery = ''
  }

  @Watch('tableOptions', { deep: true })
  async onOptionsChanged (value: TableOptions) {
    this.tableLoading = true
    await this.loadInstancesList(this.filterQuery, (value.page - 1) * value.itemsPerPage, value.itemsPerPage)
    this.tableLoading = false
  }

  @Watch('filterQuery', { deep: true })
  async onQueryChanged (value: string) {
    this.tableLoading = true
    // @ts-expect-error
    await this.loadInstancesList(value, 0, this.tableOptions.itemsPerPage)
    this.tableLoading = false
  }
}

interface InstanceTableItem {
  id: number;
  name: string;
  limit: number;
  count: number;
  created_at: string;
  expires_at: string;
  state: boolean;
}
