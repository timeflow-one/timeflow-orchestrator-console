import { TableHeader } from '@/models/TableHeader'
import { TableOptions } from '@/models/TableOptions'
import { Component, Vue, Watch } from 'vue-property-decorator'
import SearchField from '@/ui/components/SearchField.vue'
import FiltersContainer from '@/ui/components/FiltersContainer.vue'
import DataTable from '@/ui/components/DataTable.vue'
import AppbarMenuStore from '@/store/AppbarMenuStore'
import InstancesPageStore from '@/store/InstancesPageStore'
import { Filtrable } from './interfaces/Filtrable'

@Component({
  components: {
    SearchField,
    FiltersContainer,
    DataTable
  }
})
export default class InstancesPage extends Vue implements Filtrable<Filter> {
  /// --- TABLE ---
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

  protected tableLoading = false
  protected tableOptions!: TableOptions
  /// --- END TABLE ---
  /// --- FILTERS ---
  filters = {
    query: ''
  }
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

  get isFilteresDefault () {
    return this.filters.query !== ''
  }

  clearFitlers () {
    this.filters.query = ''
  }

  async onOptionsChanged (value: TableOptions) {
    try {
      this.tableOptions = value

      this.tableLoading = true
      await InstancesPageStore.loadInstances({ search: this.filters.query, offset: (value.page - 1) * value.itemsPerPage, limit: value.itemsPerPage })
    } catch (err) {
      console.error(err)
    } finally {
      this.tableLoading = false
    }
  }

  @Watch('filters', { deep: true })
  async onFiltersChanged (value: Filter) {
    try {
      this.tableLoading = true
      await InstancesPageStore.loadInstances({ search: value.query, offset: 0, limit: this.tableOptions.itemsPerPage })
    } catch (err) {
      console.error(err)
    } finally {
      this.tableLoading = false
    }
  }
}

interface Filter {
  query: string;
}
