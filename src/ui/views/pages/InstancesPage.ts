import { TableHeader } from '@/models/TableHeader'
import { TableOptions } from '@/models/TableOptions'
import { Component, Vue, Watch } from 'vue-property-decorator'
import SearchField from '@/ui/components/SearchField.vue'
import FiltersContainer from '@/ui/components/FiltersContainer.vue'
import DataTable from '@/ui/components/DataTable.vue'
import AppbarMenuStore from '@/store/AppbarMenuStore'
import InstancesStore, { InstanceModel } from '@/store/InstancesStore'
import { Filtrable } from './interfaces/Filtrable'
import { CreateInstanceRoute, InstanceRoute, InstancesRoute } from '@/router'
import { Tableable } from './interfaces/Tableable'

@Component({
  components: {
    SearchField,
    FiltersContainer,
    DataTable
  }
})
export default class InstancesPage extends Vue implements Filtrable<Filter>, Tableable<InstanceModel> {
  /// --- TABLE ---
  readonly tableHeaders: Array<TableHeader> = [
    {
      value: 'id',
      align: 'end',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.instances.table.header.0'),
      width: '6%'
    },
    {
      value: 'name',
      align: 'start',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.instances.table.header.1'),
      width: '22%'
    },
    {
      value: 'limit',
      align: 'end',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.instances.table.header.2'),
      width: '15%'
    },
    {
      value: 'count',
      align: 'end',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.instances.table.header.3'),
      width: '15%'
    },
    {
      value: 'created_at',
      align: 'start',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.instances.table.header.4'),
      width: '15%'
    },
    {
      value: 'expires_at',
      align: 'start',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.instances.table.header.5'),
      width: '18%'
    },
    {
      value: 'state',
      align: 'center',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.instances.table.header.6'),
      width: '13%'
    }
  ]

  readonly loading = {
    table: false
  }

  tableOptions!: TableOptions
  /// --- END TABLE ---
  /// --- FILTERS ---
  readonly filters = {
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

  mounted () {
    // добавляет кнопку меню в toolbar
    AppbarMenuStore.setItems([{
      title: this.$vuetify.lang.t('$vuetify.pages.instances.action.add'),
      icon: 'mdi-database-plus',
      action: () => {
        this.$router.push(CreateInstanceRoute)
      }
    }])

    // обновляем данные после возвращения на страницу
    this.$router.afterEach((to) => {
      if (to.name === InstancesRoute.name) {
        this.loadData(this.filters.query, (this.tableOptions.page - 1) * this.tableOptions.itemsPerPage, this.tableOptions.itemsPerPage)
      }
    })
  }

  beforeDestroy () {
    AppbarMenuStore.clean()
  }

  get tableItems () {
    return InstancesStore.instances
  }

  get totalItems () {
    return InstancesStore.totalInstances
  }

  async loadData (search: string, offset: number, limit: number) {
    try {
      this.loading.table = true
      await InstancesStore.loadInstances({ search, offset, limit })
    } catch (err) {
      console.error(err)
    } finally {
      this.loading.table = false
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

  clickOnRow (item: InstanceModel) {
    this.$router.push({
      ...InstanceRoute,
      params: { id: item.id.toString() }
    })
  }
}

interface Filter {
  query: string;
}
