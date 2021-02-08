import { Module, getModule, VuexModule, MutationAction } from 'vuex-module-decorators'
import store from '@/store'
import { TimeflowOrchestratorProvider } from '@/api/TimeflowOrchestratorProvider'

@Module({
  dynamic: true,
  store,
  name: 'EnrollmentsStore'
})
class EnrollmentsStore extends VuexModule {
  _enrollments: Array<EnrollmentModel> = []
  _totalEnrollments = 0

  @MutationAction({ mutate: ['_enrollments', '_totalEnrollments'], rawError: true })
  public async loadEnrollments ({ offset, limit }: { offset: number; limit: number }): Promise<{ _enrollments: Array<EnrollmentModel>; _totalEnrollments: number }> {
    const response = await TimeflowOrchestratorProvider
      .getInstance()
      .enrollments(offset, limit)

    return {
      _totalEnrollments: response.data.count,
      _enrollments: response.data.enrollments.map(it => ({
        id: it.id,
        name: {
          first_name: it.first_name,
          last_name: it.last_name,
          fullname: it.first_name + ' ' + it.last_name
        },
        email: it.email,
        phone: it.phone,
        company_name: it.company_name,
        country: it.country,
        created_at: new Date(it.created_at),
        expired_at: new Date(it.token_active_until),
        is_active: new Date().getTime() < new Date(it.token_active_until).getTime()
      }))
    }
  }

  get enrollments () {
    return this._enrollments
  }

  get totalEnrollments () {
    return this._totalEnrollments
  }
}

export interface EnrollmentModel {
  id: number;
  name: {
    first_name: string;
    last_name: string;
    fullname: string;
  };
  email: string;
  phone: string;
  company_name: string;
  country: string;
  created_at: Date;
  expired_at: Date;
  is_active: boolean;
}

export default getModule(EnrollmentsStore)
