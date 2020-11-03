import { TableHeader } from '@/models/TableHeader'
import { TableOptions } from '@/models/TableOptions'
import { Component, Vue, Watch } from 'vue-property-decorator'
import SearchField from '@/ui/components/SearchField.vue'
import FiltersContainer from '@/ui/components/FiltersContainer.vue'
import AppbarMenuStore from '@/store/AppbarMenuStore'
import InstancesPageStore from '@/store/InstancesPageStore'

@Component({
  components: {
    SearchField,
    FiltersContainer
  }
})
export default class InstancesPage extends Vue {
  protected tableLoading = false
  protected readonly tableHeaders: Array<TableHeader> = [
    {
      value: 'id',
      align: 'start',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.instances.table.headers.0'),
      width: '6%'
    },
    {
      value: 'name',
      align: 'start',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.instances.table.headers.1'),
      width: '22%'
    },
    {
      value: 'limit',
      align: 'start',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.instances.table.headers.2'),
      width: '15%'
    },
    {
      value: 'count',
      align: 'start',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.instances.table.headers.3'),
      width: '15%'
    },
    {
      value: 'created_at',
      align: 'start',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.instances.table.headers.4'),
      width: '15%'
    },
    {
      value: 'expires_at',
      align: 'start',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.instances.table.headers.5'),
      width: '18%'
    },
    {
      value: 'state',
      align: 'center',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.instances.table.headers.6'),
      width: '13%'
    }
  ]

  protected readonly tableOptions: Partial<TableOptions> = {}
  /// --- FILTERS ---
  protected filterQuery = ''
  /// --- END FILTERS ---

  protected mounted () {
    AppbarMenuStore.setItems([{
      title: this.$vuetify.lang.t('$vuetify.pages.instances.actions.add'),
      icon: 'mdi-database-plus',
      action: () => {
        throw new Error('Not implemented')
      }
    }])
  }

  protected beforeDestroy () {
    AppbarMenuStore.clean()
  }

  get tableItems () {
    return InstancesPageStore.instances
  }

  get totalItems () {
    return InstancesPageStore.totalInstances
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
    try {
      this.tableLoading = true
      await InstancesPageStore.loadInstances(this.filterQuery, (value.page - 1) * value.itemsPerPage, value.itemsPerPage)
    } catch (err) {
      console.error(err)
    } finally {
      this.tableLoading = false
    }
  }

  @Watch('filterQuery', { deep: true })
  async onQueryChanged (value: string) {
    try {
      this.tableLoading = true
      // @ts-expect-error
      await InstancesPageStore.loadInstances(value, 0, this.tableOptions.itemsPerPage)
    } catch (err) {
      console.error(err)
    } finally {
      this.tableLoading = false
    }
  }
}
