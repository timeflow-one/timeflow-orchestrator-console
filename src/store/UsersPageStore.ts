import { Module, getModule, VuexModule, MutationAction } from 'vuex-module-decorators'
import store from '@/store'
import { TimeflowOrchestratorProvider } from '@/api/TimeflowOrchestratorProvider'

@Module({
  dynamic: true,
  store,
  name: 'UsersPageStore'
})
class UsersPageStore extends VuexModule {
  public _users: Array<User> = []
  // общее количество элементов на сервере, для пагинации
  public _totalUsers = 0

  @MutationAction({ mutate: ['_users', '_totalUsers'], rawError: true })
  public async loadUsers ({ search, isDeleted, offset, limit }: { search: string; isDeleted: boolean | null; offset: number; limit: number }) {
    const response = await TimeflowOrchestratorProvider
      .getInstance()
      .users(search, isDeleted, offset, limit)

    return {
      _totalUsers: response.data.count,
      _users: response.data.users.map((item) => ({
        id: item.id,
        name: item.full_name,
        instance_name: item.instance?.name,
        role: item.role,
        status: item.is_deleted === 0
      }))
    }
  }

  get users () {
    return this._users
  }

  get totalUsers () {
    return this._totalUsers
  }
}

interface User {
  id: number;
  name: string;
  instance_name: string;
  role: string;
  status: boolean;
}

export default getModule(UsersPageStore)
