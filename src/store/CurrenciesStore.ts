import { Module, getModule, VuexModule, MutationAction } from 'vuex-module-decorators'
import store from '@/store'
import { TimeflowOrchestratorProvider } from '@/api/TimeflowOrchestratorProvider'

@Module({
  dynamic: true,
  store,
  name: 'CurrenciesStore'
})
class CurrenciesStore extends VuexModule {
  _currencies: Array<{ text: string; value: string }> = []

  @MutationAction({ mutate: ['_currencies'], rawError: true })
  async loadCurrencies () {
    const response = await TimeflowOrchestratorProvider
      .getInstance()
      .currencies()

    return {
      _currencies: Object.entries(response.data.currencies).map(it => ({
        value: it[0],
        text: it[1]
      }))
    }
  }

  get currencies () {
    return this._currencies
  }
}

export default getModule(CurrenciesStore)
