import { Component, Vue } from 'vue-property-decorator'
import SearchField from '@/ui/components/SearchField.vue'
import FiltersContainer from '@/ui/components/FiltersContainer.vue'
import DataTable from '@/ui/components/DataTable.vue'
import { TableHeader } from '@/models/TableHeader'
import { TableOptions } from '@/models/TableOptions'

@Component({
  components: {
    SearchField,
    FiltersContainer,
    DataTable
  }
})
export default class UsersPage extends Vue {
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
  protected filterActive = 1
  protected filterQuery = ''
  /// --- END FILTERS ---
}
