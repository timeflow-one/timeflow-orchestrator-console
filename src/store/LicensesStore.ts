import { Module, getModule, VuexModule, MutationAction } from 'vuex-module-decorators'
import store from '@/store'
import { TimeflowOrchestratorProvider } from '@/api/TimeflowOrchestratorProvider'

@Module({
  dynamic: true,
  store,
  name: 'LicensesStore'
})
class LicensesStore extends VuexModule {
  public _licenses: Array<LicenseModel> = []
  // общее количество элементов на сервере, для пагинации
  public _totalLicenses = 0

  @MutationAction({ mutate: ['_licenses', '_totalLicenses'], rawError: true })
  public async loadLicenses ({ offset, limit }: { offset: number; limit: number }) {
    const response = await TimeflowOrchestratorProvider
      .getInstance()
      .licenses(offset, limit)

    return {
      _totalLicenses: response.data.count,
      _licenses: response.data.licenses.map((item) => ({
        id: item.id,
        instance: {
          id: item.instance.id,
          name: item.instance.name
        },
        plan: {
          id: item.plan.id,
          name: item.plan.title
        },
        is_active: item.is_active > 0,
        start_at: new Date(item.effective_date),
        expired_at: new Date(item.valid_until),
        can_promise_payment: item.can_promise_payment
      }))
    }
  }

  get licenses () {
    return this._licenses
  }

  get totalLicenses () {
    return this._totalLicenses
  }
}

export interface LicenseModel {
  id: number;
  instance: {
    id: number;
    name: string;
  };
  plan: {
    id: number;
    name: string;
  };
  is_active: boolean;
  start_at: Date;
  expired_at: Date;
  can_promise_payment: 0 | 1;
}

export default getModule(LicensesStore)
