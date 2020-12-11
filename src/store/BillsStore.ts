import { Module, getModule, VuexModule, MutationAction } from 'vuex-module-decorators'
import store from '@/store'
import { TimeflowOrchestratorProvider } from '@/api/TimeflowOrchestratorProvider'
import { PlanModel } from './PlansStore'

@Module({
  dynamic: true,
  store,
  name: 'BillsStore'
})
class BillsStore extends VuexModule {
  public _bills: Array<BillModel> = []
  // общее количество элементов на сервере, для пагинации
  public _totalBills = 0

  @MutationAction({ mutate: ['_bills', '_totalBills'], rawError: true })
  public async loadBills ({ offset, limit }: { offset: number; limit: number }) {
    const response = await TimeflowOrchestratorProvider
      .getInstance()
      .bills(offset, limit)

    return {
      _totalBills: response.data.count,
      _bills: response.data.bills.map((item) => ({
        id: item.id,
        transaction_no: item.transaction_no,
        to_pay_on: new Date(item.to_pay_on),
        created_at: new Date(item.created_at),
        status: item.status,
        customer: {
          legal_title: item.legal_title,
          inn: item.inn,
          kpp: item.kpp
        },
        plan: {
          id: item.license.plan.id,
          title: item.license.plan.title,
          code: item.license.plan.code,
          employees_limit: item.license.plan.employees_limit,
          monthly_fee_text: item.license.plan.monthly_fee_text,
          status: item.license.plan.is_deleted < 1
        }
      }))
    }
  }

  get bills () {
    return this._bills
  }

  get totalBills () {
    return this._totalBills
  }
}

export interface BillModel {
  id: number;
  transaction_no: string;
  to_pay_on: string;
  created_at: string;
  status: string;
  customer: {
    legal_title: string | null;
    kpp: string | null;
    inn: string | null;
  };
  plan: PlanModel;
}

export default getModule(BillsStore)
