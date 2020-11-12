import { Module, getModule, VuexModule, MutationAction } from 'vuex-module-decorators'
import store from '@/store'
import { Profile } from '@/api/responses/SignInResponse'
import { TimeflowOrchestratorProvider } from '@/api/TimeflowOrchestratorProvider'
import { PreferenceKey } from '@/utils/PreferenceKey'

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
    const profile = localStorage.getItem(PreferenceKey.PROFILE_KEY)
    const token = localStorage.getItem(PreferenceKey.TOKEN_KEY)

    return {
      _profile: profile ? JSON.parse(profile) : null,
      _token: token
    }
  }

  @MutationAction({ mutate: ['_profile', '_token'], rawError: true })
  public async logout () {
    localStorage.removeItem(PreferenceKey.PROFILE_KEY)
    localStorage.removeItem(PreferenceKey.TOKEN_KEY)

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

    localStorage.setItem(PreferenceKey.TOKEN_KEY, response.data.user.access_token)
    localStorage.setItem(PreferenceKey.PROFILE_KEY, JSON.stringify(response.data.user))

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
