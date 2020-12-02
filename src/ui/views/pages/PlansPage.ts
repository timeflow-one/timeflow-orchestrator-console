import { TableHeader } from '@/models/TableHeader'
import { TableOptions } from '@/models/TableOptions'
import { CreatePlanRoute, PlansRoute } from '@/router'
import AppbarMenuStore from '@/store/AppbarMenuStore'
import PlansStore, { PlanModel } from '@/store/PlansStore'
import { Component, Vue } from 'vue-property-decorator'
import DataTable from '@/ui/components/DataTable.vue'
import CodeComponent from '@/ui/components/CodeComponent.vue'

@Component({
  components: {
    DataTable,
    CodeComponent
  }
})
export default class PlansPage extends Vue {
  /// --- TABLE ---
  readonly tableHeaders: Array<TableHeader> = [
    {
      value: 'id',
      align: 'end',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.plans.table.header.0'),
      width: '6%'
    },
    {
      value: 'name',
      align: 'start',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.plans.table.header.1'),
      width: '22%'
    },
    {
      value: 'code',
      align: 'start',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.plans.table.header.2'),
      width: '15%'
    },
    {
      value: 'limit',
      align: 'end',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.plans.table.header.3'),
      width: '15%'
    },
    {
      value: 'price',
      align: 'end',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.plans.table.header.4'),
      width: '15%'
    },
    {
      value: 'status',
      align: 'center',
      sortable: false,
      divider: false,
      text: this.$vuetify.lang.t('$vuetify.pages.plans.table.header.5'),
      width: '18%'
    }
  ]

  readonly loading = {
    table: false
  }

  tableOptions!: TableOptions
  /// --- END TABLE ---

  mounted () {
    // добавляет кнопку меню в toolbar
    AppbarMenuStore.setItems([{
      title: this.$vuetify.lang.t('$vuetify.pages.plans.action.add'),
      icon: 'mdi-text-box-plus-outline',
      action: () => {
        this.$router.push(CreatePlanRoute)
      }
    }])

    // обновляем данные после возвращения на страницу
    this.$router.afterEach((to) => {
      if (to.name === PlansRoute.name) {
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
      await PlansStore.loadPlans({ offset, limit })
    } catch (err) {
      console.error(err)
    } finally {
      this.loading.table = false
    }
  }

  clickOnRow (item: PlanModel) {
    // this.$router.push({
    //   ...PlanRoute,
    //   params: { id: item.id.toString() }
    // })
    throw new Error('Not implemented')
  }

  onOptionsChanged (value: TableOptions) {
    this.tableOptions = value
    this.loadData((value.page - 1) * value.itemsPerPage, value.itemsPerPage)
  }

  get tableItems () {
    return PlansStore.plans
  }

  get totalItems () {
    return PlansStore.totalPlans
  }

  get isSubpage () {
    return PlansRoute.children?.some(it => it.name === this.$route.name)
  }
}
