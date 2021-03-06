import { Module, getModule, VuexModule, MutationAction } from 'vuex-module-decorators'
import store from '@/store'
import { TimeflowOrchestratorProvider } from '@/api/TimeflowOrchestratorProvider'

@Module({
  dynamic: true,
  store,
  name: 'UsersStore'
})
class UsersStore extends VuexModule {
  public _users: Array<UserModel> = []
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
        access_token: item.access_token,
        name: item.full_name,
        email: item.email,
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

export interface UserModel {
  id: number;
  access_token: string;
  name: string;
  email: string;
  instance_name: string;
  role: string;
  status: boolean;
}

export default getModule(UsersStore)
