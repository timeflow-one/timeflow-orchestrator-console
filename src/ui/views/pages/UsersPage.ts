import { Component, Vue, Watch } from 'vue-property-decorator'
import SearchField from '@/ui/components/SearchField.vue'
import FiltersContainer from '@/ui/components/FiltersContainer.vue'
import DataTable from '@/ui/components/DataTable.vue'
import { TableHeader } from '@/models/TableHeader'
import { TableOptions } from '@/models/TableOptions'
import { Filtrable } from './interfaces/Filtrable'
import UsersStore, { UserModel } from '@/store/UsersStore'
import { UserRoute, UsersRoute } from '@/router'
import AuthStore from '@/store/AuthStore'
import { Tableable } from './interfaces/Tableable'

@Component({
  components: {
    SearchField,
    FiltersContainer,
    DataTable
  }
})
export default class UsersPage extends Vue implements Filters, Filtrable<Filters>, Tableable<UserModel> {
  /// --- TABLE ---
  readonly tableHeaders: Array<TableHeader> = [
    {
      value: 'id',
      align: 'end',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.users.table.header.0'),
      width: '6%'
    },
    {
      value: 'name',
      align: 'start',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.users.table.header.1'),
      width: '25%'
    },
    {
      value: 'email',
      align: 'start',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.users.table.header.2'),
      width: '25%'
    },
    {
      value: 'instance',
      align: 'start',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.users.table.header.3'),
      width: '15%'
    },
    {
      value: 'role',
      align: 'start',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.users.table.header.4'),
      width: '25%'
    },
    {
      value: 'status',
      align: 'center',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.users.table.header.5'),
      width: '5%'
    },
    {
      value: 'actions',
      align: 'center',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.users.table.header.6'),
      width: '18%'
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
    return !this.search &&
      this.isDeleted === null
  }

  clearFitlers () {
    this.search = undefined
    this.isDeleted = null
  }

  @Watch('$route.query', { deep: true })
  async onFiltersChanged () {
    // @ts-expect-error
    this.$refs.table.setPage(1)
  }
  /// --- END FILTERS ---

  mounted () {
    // обновляем данные после возвращения на страницу
    this.$router.afterEach((to) => {
      if (to.name === UsersRoute.name) {
        // this.loadData(this.search, this.isDeleted, (this.tableOptions.page - 1) * this.tableOptions.itemsPerPage, this.tableOptions.itemsPerPage)
      }
    })
  }

  get tableItems () {
    return UsersStore.users
  }

  get totalItems () {
    return UsersStore.totalUsers
  }

  onOptionsChanged (value: TableOptions) {
    this.tableOptions = value
    this.loadData(this.search, this.isDeleted, (value.page - 1) * value.itemsPerPage, value.itemsPerPage)
  }

  async loadData (search: string, isDeleted: boolean | null, offset: number, limit: number) {
    try {
      this.loading.table = true
      await UsersStore.loadUsers({ search, isDeleted, offset, limit })
    } catch (err) {
      console.error(err)
    } finally {
      this.loading.table = false
    }
  }

  get isSubpage () {
    return UsersRoute.children?.some(it => it.name === this.$route.name)
  }

  onSubpageClosed () {
    this.$router.replace(UsersRoute)
  }

  clickOnRow (item: UserModel) {
    this.$router.push({
      ...UserRoute,
      params: { id: item.id.toString() }
    })
  }

  clickOutsideSubpage () {
    // @ts-expect-error
    this.$refs.subpage.cancel()
  }

  loginAs (item: UserModel) {
    const userConsolePage = window.open(`${process.env.VUE_APP_USER_CONSOLE_URL}/login-as?orchestrator=${AuthStore.token}&user=${item.access_token}`, '_blank')
    return userConsolePage?.focus()
  }
}

interface Filters {
  isDeleted: boolean | null;
  search: string;
}
