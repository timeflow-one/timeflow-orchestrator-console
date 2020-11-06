import { Module, getModule, VuexModule, MutationAction } from 'vuex-module-decorators'
import store from '@/store'
import { Profile } from '@/api/responses/SignInResponse'
import { TimeflowOrchestratorProvider } from '@/api/TimeflowOrchestratorProvider'

@Module({
  dynamic: true,
  store,
  name: 'AuthStore'
})
class AuthStore extends VuexModule {
  public _profile: Profile | null = null
  public _token: string | null = null

  @MutationAction({ mutate: ['_profile', '_token'], rawError: true })
  public async load () {
    const profile = localStorage.getItem(process.env.VUE_APP_PROFILE_KEY)
    const token = localStorage.getItem(process.env.VUE_APP_TOKEN_KEY)

    return {
      _profile: profile ? JSON.parse(profile) : null,
      _token: token
    }
  }

  @MutationAction({ mutate: ['_profile', '_token'], rawError: true })
  public async logout () {
    localStorage.removeItem(process.env.VUE_APP_PROFILE_KEY)
    localStorage.removeItem(process.env.VUE_APP_TOKEN_KEY)

    return {
      _profile: null,
      _token: null
    }
  }

  @MutationAction({ mutate: ['_profile', '_token'], rawError: true })
  public async signIn ({ login, password }: { login: string; password: string }) {
    const response = await TimeflowOrchestratorProvider
      .getInstance()
      .signIn(login, password)

    localStorage.setItem(process.env.VUE_APP_TOKEN_KEY, response.data.user.access_token)
    localStorage.setItem(process.env.VUE_APP_PROFILE_KEY, JSON.stringify(response.data.user))

    return {
      _profile: response.data.user,
      _token: response.data.user.access_token
    }
  }

  public get isAuth () {
    return !!this._token
  }

  public get token () {
    return this._token
  }

  public get profile () {
    return this._profile
  }
}

export default getModule(AuthStore)
