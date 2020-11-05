import { Component, Vue, Watch } from 'vue-property-decorator'
import SearchField from '@/ui/components/SearchField.vue'
import FiltersContainer from '@/ui/components/FiltersContainer.vue'
import DataTable from '@/ui/components/DataTable.vue'
import { TableHeader } from '@/models/TableHeader'
import { TableOptions } from '@/models/TableOptions'
import { Filtrable } from './interfaces/Filtrable'

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
      width: '22%'
    },
    {
      value: 'instance',
      align: 'start',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.users.table.headers.2'),
      width: '15%'
    },
    {
      value: 'role',
      align: 'start',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.users.table.headers.3'),
      width: '15%'
    },
    {
      value: 'status',
      align: 'start',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.users.table.headers.4'),
      width: '15%'
    },
    {
      value: 'actions',
      align: 'start',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.users.table.headers.5'),
      width: '18%'
    }
  ]

  protected tableLoading = false
  protected tableOptions!: TableOptions
  /// --- END TABLE ---
  /// --- FILTERS ---
  filters: Filter = {
    query: '',
    active: 1
  }

  get isFilteresDefault () {
    return this.filters.query === '' &&
      this.filters.active === 1
  }

  clearFitlers () {
    this.filters.query = ''
    this.filters.active = 1
  }

  @Watch('filters', { deep: true })
  onFiltersChanged (value: Filter): Promise<void> {
    throw new Error('Method not implemented.')
  }
  /// --- END FILTERS ---
}

interface Filter {
  active: 0 | 1 | 2;
  query: string;
}
