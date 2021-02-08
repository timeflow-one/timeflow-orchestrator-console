import { Component, Vue, Watch } from 'vue-property-decorator'
import DataTable from '@/ui/components/DataTable.vue'
import { Tableable } from './interfaces/Tableable'
import EnrollmentsStore, { EnrollmentModel } from '@/store/EnrollmentsStore'
import { TableHeader } from '@/models/TableHeader'
import { TableOptions } from '@/models/TableOptions'
import { EnrollmentsRoute } from '@/router'
import AppbarMenuStore from '@/store/AppbarMenuStore'

@Component({
  components: {
    DataTable
  }
})
export default class EnrollmentsPage extends Vue implements Tableable<EnrollmentModel> {
  tableHeaders: TableHeader[] = [
    {
      value: 'id',
      align: 'end',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.enrollments.table.header.0'),
      width: '3%'
    },
    {
      value: 'fullname',
      align: 'start',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.enrollments.table.header.1'),
      width: '15%'
    },
    {
      value: 'email',
      align: 'start',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.enrollments.table.header.2'),
      width: '10%'
    },
    {
      value: 'phone',
      align: 'start',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.enrollments.table.header.3'),
      width: '10%'
    },
    {
      value: 'company_name',
      align: 'start',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.enrollments.table.header.4'),
      width: '15%'
    },
    {
      value: 'country',
      align: 'start',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.enrollments.table.header.5'),
      width: '6%'
    },
    {
      value: 'created_at',
      align: 'start',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.enrollments.table.header.6'),
      width: '10%'
    },
    {
      value: 'expired_at',
      align: 'start',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.enrollments.table.header.7'),
      width: '10%'
    }
  ]

  loading = {
    table: false
  }

  tableOptions!: TableOptions

  get tableItems () {
    return EnrollmentsStore.enrollments
  }

  get totalItems () {
    return EnrollmentsStore.totalEnrollments
  }

  mounted () {
    // обновляем данные после возвращения на страницу
    this.$router.afterEach((to) => {
      if (to.name === EnrollmentsRoute.name) {
        this.loadData((this.tableOptions.page - 1) * this.tableOptions.itemsPerPage, this.tableOptions.itemsPerPage)
      }
    })
  }

  beforeDestroy () {
    AppbarMenuStore.clean()
  }

  async loadData (offset: number, limit: number) {
    try {
      this.loading.table = true
      await EnrollmentsStore.loadEnrollments({ offset, limit })
    } catch (err) {
      console.error(err)
    } finally {
      this.loading.table = false
    }
  }

  onOptionsChanged (value: TableOptions) {
    this.tableOptions = value
    this.loadData((value.page - 1) * value.itemsPerPage, value.itemsPerPage)
  }

  @Watch('$route.query', { deep: true })
  async onFiltersChanged () {
    // @ts-expect-error
    this.$refs.table.setPage(1)
  }

  get isSubpage () {
    return EnrollmentsRoute.children?.some(it => it.name === this.$route.name)
  }

  onSubpageClosed () {
    this.$router.replace(EnrollmentsRoute)
  }

  clickOnRow (item: EnrollmentModel) {
    throw new Error('Method not implemented.')
  }

  clickOutsideSubpage () {
    // @ts-expect-error
    this.$refs.subpage.cancel()
  }
}
