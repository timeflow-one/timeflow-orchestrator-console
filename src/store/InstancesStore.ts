import { Module, getModule, VuexModule, MutationAction } from 'vuex-module-decorators'
import store from '@/store'
import { TimeflowOrchestratorProvider } from '@/api/TimeflowOrchestratorProvider'

@Module({
  dynamic: true,
  store,
  name: 'InstancesStore'
})
class InstancesStore extends VuexModule {
  public _instances: Array<InstanceModel> = []
  // общее количество элементов на сервере, для пагинации
  public _totalInstances = 0

  @MutationAction({ mutate: ['_instances', '_totalInstances'], rawError: true })
  public async loadInstances ({ search, offset, limit }: { search: string; offset: number; limit: number }) {
    const response = await TimeflowOrchestratorProvider
      .getInstance()
      .instances(search, offset, limit)

    return {
      _totalInstances: response.data.count,
      _instances: response.data.instances.map((item) => {
        const createdAt = new Date(item.created_at)
        const expiresAt = new Date(item.created_at)
        expiresAt.setDate(expiresAt.getDate() + item.stats.license.duration)

        return {
          id: item.id,
          name: item.name,
          limit: item.stats.employees.licensed,
          count: item.stats.employees.active,
          created_at: createdAt,
          expires_at: expiresAt,
          is_required_upgrade: item.requires_upgrade,
          db: {
            db_host: item.db_host,
            db_name: item.db_name,
            db_user: item.db_username,
            db_pass: item.db_password
          },
          vi_key: item.vi_api_key,
          geo_key: item.dadata_api_key
        }
      })
    }
  }

  get instances () {
    return this._instances
  }

  get totalInstances () {
    return this._totalInstances
  }
}

export interface InstanceModel {
  id: number;
  name: string;
  limit: number;
  count: number;
  created_at: string;
  expires_at: string;
  state: boolean;
  db: {
    db_host: string;
    db_name: string;
    db_user: string;
    db_pass: string;
  };
  vi_key: string;
  geo_key: string;
}

export default getModule(InstancesStore)
