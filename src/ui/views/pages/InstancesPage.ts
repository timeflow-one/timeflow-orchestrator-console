import { TableHeader } from '@/models/TableHeader'
import { TableOptions } from '@/models/TableOptions'
import { Component, Vue, Watch } from 'vue-property-decorator'
import SearchField from '@/ui/components/SearchField.vue'
import FiltersContainer from '@/ui/components/FiltersContainer.vue'
import DataTable from '@/ui/components/DataTable.vue'
import AppbarMenuStore from '@/store/AppbarMenuStore'
import InstancesPageStore from '@/store/InstancesPageStore'
import { Filtrable } from './interfaces/Filtrable'
import { AddInstanceRoute, InstanceRoute, InstancesRoute } from '@/router'

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

  get isFilteresDefault () {
    return this.filters.query !== ''
  }

  clearFitlers () {
    this.filters.query = ''
  }

  @Watch('filters', { deep: true })
  async onFiltersChanged () {
    // @ts-expect-error
    this.$refs.table.setPage(1)
  }
  /// --- END FILTERS ---

  protected mounted () {
    // добавляет кнопку меню в toolbar
    AppbarMenuStore.setItems([{
      title: this.$vuetify.lang.t('$vuetify.pages.instances.actions.add'),
      icon: 'mdi-database-plus',
      action: () => {
        this.$router.push(AddInstanceRoute)
      }
    }])

    // обновляем данные после возвращения на страницу
    this.$router.afterEach((to) => {
      if (to.name === InstancesRoute.name) {
        this.loadData(this.filters.query, (this.tableOptions.page - 1) * this.tableOptions.itemsPerPage, this.tableOptions.itemsPerPage)
      }
    })
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

  async loadData (search: string, offset: number, limit: number) {
    try {
      this.tableLoading = true
      await InstancesPageStore.loadInstances({ search, offset, limit })
    } catch (err) {
      console.error(err)
    } finally {
      this.tableLoading = false
    }
  }

  onOptionsChanged (value: TableOptions) {
    this.tableOptions = value
    this.loadData(this.filters.query, (value.page - 1) * value.itemsPerPage, value.itemsPerPage)
  }

  get isSubpage () {
    return InstancesRoute.children?.some(it => it.name === this.$route.name)
  }

  onSubpageClosed () {
    this.$router.replace(InstancesRoute)
  }

  clickOnRow (value: InstanceItem) {
    this.$router.push({
      ...InstanceRoute,
      params: { id: value.id.toString() },
      query: { name: value.name }
    })
  }
}

interface InstanceItem {
  id: number;
  name: string;
  limit: number;
  count: number;
  created_at: string;
  expires_at: string;
  state: boolean;
}

interface Filter {
  query: string;
}
