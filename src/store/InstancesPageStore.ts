import { Module, getModule, VuexModule, MutationAction } from 'vuex-module-decorators'
import store from '@/store'
import { TimeflowOrchestratorProvider } from '@/api/TimeflowOrchestratorProvider'

@Module({
  dynamic: true,
  store,
  name: 'InstancesPageStore'
})
class InstancesPageStore extends VuexModule {
  public _instances: Array<InstanceItem> = []
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
          created_at: createdAt.toLocaleDateString(),
          expires_at: expiresAt.toLocaleDateString(),
          state: item.requires_upgrade
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

interface InstanceItem {
  id: number;
  name: string;
  limit: number;
  count: number;
  created_at: string;
  expires_at: string;
  state: boolean;
}

export default getModule(InstancesPageStore)
