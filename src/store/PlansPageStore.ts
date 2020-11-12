import { Module, getModule, VuexModule, MutationAction } from 'vuex-module-decorators'
import store from '@/store'
import { TimeflowOrchestratorProvider } from '@/api/TimeflowOrchestratorProvider'

@Module({
  dynamic: true,
  store,
  name: 'PlansPageStore'
})
class PlansPageStore extends VuexModule {
  public _plans: Array<PlanModel> = []
  // общее количество элементов на сервере, для пагинации
  public _totalPlans = 0

  @MutationAction({ mutate: ['_plans', '_totalPlans'], rawError: true })
  public async loadPlans ({ offset, limit }: { offset: number; limit: number }) {
    const response = await TimeflowOrchestratorProvider
      .getInstance()
      .plans(offset, limit)

    return {
      _totalPlans: response.data.count,
      _plans: response.data.plans.map((item) => ({
        id: item.id,
        title: item.title,
        code: item.code,
        employees_limit: item.employees_limit,
        monthly_fee_text: item.monthly_fee_text,
        status: item.is_deleted < 1
      }))
    }
  }

  get plans () {
    return this._plans
  }

  get totalPlans () {
    return this._totalPlans
  }
}

export interface PlanModel {
  id: number;
  title: string;
  code: number;
  employees_limit: number;
  monthly_fee_text: string;
  status: boolean;
}

export default getModule(PlansPageStore)
