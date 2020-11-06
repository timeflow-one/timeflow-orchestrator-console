import { Module, getModule, VuexModule, MutationAction } from 'vuex-module-decorators'
import store from '@/store'
import { TimeflowOrchestratorProvider } from '@/api/TimeflowOrchestratorProvider'

@Module({
  dynamic: true,
  store,
  name: 'PlansStore'
})
class PlansStore extends VuexModule {
  _plans: Array<Plan> = []

  @MutationAction({ mutate: ['_plans'] })
  async loadPlans () {
    const response = await TimeflowOrchestratorProvider
      .getInstance()
      .plans()

    return {
      _plans: response.data.plans.filter(it => it.is_deleted < 1).map(it => ({
        id: it.id,
        title: it.title,
        code: it.code
      }))
    }
  }

  get plans () {
    return this._plans
  }
}

interface Plan {
  code: string;
  id: number;
  title: string;
}

export default getModule(PlansStore)
