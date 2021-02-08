import { Module, getModule, VuexModule } from 'vuex-module-decorators'
import store from '@/store'

@Module({
  dynamic: true,
  store,
  name: 'EnrollmentsStore'
})
class EnrollmentsStore extends VuexModule {
  _enrollments: Array<any> = []
}

export default getModule(EnrollmentsStore)
