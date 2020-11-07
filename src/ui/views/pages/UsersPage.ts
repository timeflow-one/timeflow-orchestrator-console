import { Component, Vue, Watch } from 'vue-property-decorator'
import SearchField from '@/ui/components/SearchField.vue'
import FiltersContainer from '@/ui/components/FiltersContainer.vue'
import DataTable from '@/ui/components/DataTable.vue'
import { TableHeader } from '@/models/TableHeader'
import { TableOptions } from '@/models/TableOptions'
import { Filtrable } from './interfaces/Filtrable'
import UsersPageStore from '@/store/UsersPageStore'

@Component({
  components: {
    SearchField,
    FiltersContainer,
    DataTable
  }
})
export default class UsersPage extends Vue implements Filtrable<Filter> {
  /// --- TABLE ---
  protected readonly tableHeaders: Array<TableHeader> = [
    {
      value: 'id',
      align: 'start',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.users.table.headers.0'),
      width: '6%'
    },
    {
      value: 'name',
      align: 'start',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.users.table.headers.1'),
      width: '25%'
    },
    {
      value: 'email',
      align: 'start',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.users.table.headers.2'),
      width: '25%'
    },
    {
      value: 'instance',
      align: 'start',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.users.table.headers.3'),
      width: '15%'
    },
    {
      value: 'role',
      align: 'start',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.users.table.headers.4'),
      width: '25%'
    },
    {
      value: 'status',
      align: 'center',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.users.table.headers.5'),
      width: '5%'
    },
    {
      value: 'actions',
      align: 'center',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.users.table.headers.6'),
      width: '18%'
    }
  ]

  protected tableLoading = false
  protected tableOptions!: TableOptions
  /// --- END TABLE ---
  /// --- FILTERS ---
  protected isDeletedSelect: Array<{ title: string; value: boolean | null }> = [{
    title: this.$vuetify.lang.t('$vuetify.pages.users.filters.active.all'),
    value: null
  }, {
    title: this.$vuetify.lang.t('$vuetify.pages.users.filters.active.enabled'),
    value: false
  }, {
    title: this.$vuetify.lang.t('$vuetify.pages.users.filters.active.disabled'),
    value: true
  }]

  filters: Filter = {
    query: '',
    isDeleted: false
  }

  get isFilteresDefault () {
    return this.filters.query === '' &&
      this.filters.isDeleted === false
  }

  clearFitlers () {
    this.filters.query = ''
    this.filters.isDeleted = false
  }

  @Watch('filters', { deep: true })
  async onFiltersChanged (value: Filter): Promise<void> {
    // @ts-expect-error
    this.$refs.table.setPage(1)
    this.loadData(value.query, value.isDeleted, 0, this.tableOptions.itemsPerPage)
  }
  /// --- END FILTERS ---

  get tableItems () {
    return UsersPageStore.users
  }

  get totalItems () {
    return UsersPageStore.totalUsers
  }

  onOptionsChanged (value: TableOptions) {
    this.tableOptions = value
    this.loadData(this.filters.query, this.filters.isDeleted, (value.page - 1) * value.itemsPerPage, value.itemsPerPage)
  }

  async loadData (search: string, isDeleted: boolean | null, offset: number, limit: number) {
    try {
      this.tableLoading = true
      await UsersPageStore.loadUsers({ search, isDeleted, offset, limit })
    } catch (err) {
      console.error(err)
    } finally {
      this.tableLoading = false
    }
  }
}

interface Filter {
  isDeleted: boolean | null;
  query: string;
}
