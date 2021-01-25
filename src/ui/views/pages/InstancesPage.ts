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
export default class InstancesPage extends Vue implements Filters, Filtrable<Filters>, Tableable<InstanceModel> {
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
  isDeletedSelect: Array<{ title: string; value: boolean | null }> = [{
    title: this.$vuetify.lang.t('$vuetify.pages.users.filter.active.all'),
    value: null
  }, {
    title: this.$vuetify.lang.t('$vuetify.pages.users.filter.active.enabled'),
    value: false
  }, {
    title: this.$vuetify.lang.t('$vuetify.pages.users.filter.active.disabled'),
    value: true
  }]

  get search () {
    return this.$route.query.search
  }

  set search (value: any) {
    this.$router.push({
      query: {
        ...this.$route.query,
        search: value !== '' ? value : undefined
      }
    })
  }

  get isDeleted () {
    switch (this.$route.query.inactive) {
      case undefined:
        return null

      case 'false':
        return false

      case 'true':
        return true
    }
  }

  set isDeleted (value: any) {
    this.$router.push({
      query: {
        ...this.$route.query,
        inactive: value !== null ? value : undefined
      }
    })
  }

  get isFilteresDefault () {
    return !!this.search
  }

  clearFitlers () {
    this.search = undefined
  }

  @Watch('$route.query', { deep: true })
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
        this.loadData(this.search, this.isDeleted, (this.tableOptions.page - 1) * this.tableOptions.itemsPerPage, this.tableOptions.itemsPerPage)
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

  async loadData (search: string, isDeleted: boolean | null, offset: number, limit: number) {
    try {
      this.loading.table = true
      await InstancesStore.loadInstances({ search, isDeleted, offset, limit })
    } catch (err) {
      console.error(err)
    } finally {
      this.loading.table = false
    }
  }

  onOptionsChanged (value: TableOptions) {
    this.tableOptions = value
    this.loadData(this.search, this.isDeleted, (value.page - 1) * value.itemsPerPage, value.itemsPerPage)
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

  clickOutsideSubpage () {
    // @ts-expect-error
    this.$refs.subpage.cancel()
  }
}

interface Filters {
  search: any;
}
