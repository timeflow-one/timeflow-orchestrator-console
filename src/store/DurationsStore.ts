import { Module, getModule, VuexModule, MutationAction } from 'vuex-module-decorators'
import store from '@/store'
import { TimeflowOrchestratorProvider } from '@/api/TimeflowOrchestratorProvider'

@Module({
  dynamic: true,
  store,
  name: 'DurationsStore'
})
class DurationsStore extends VuexModule {
  _durations: Array<number> = []

  @MutationAction({ mutate: ['_durations'], rawError: true })
  async loadDurations () {
    const response = await TimeflowOrchestratorProvider
      .getInstance()
      .durations()

    return {
      _durations: response.data.durations
    }
  }

  get durations () {
    return this._durations
  }
}

export default getModule(DurationsStore)
