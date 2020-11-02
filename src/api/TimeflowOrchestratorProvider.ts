import Axios, { AxiosResponse } from 'axios'
import { InstancesResponse } from './responses/InstancesResponse'
import { SignInResponse } from './responses/SignInResponse'

export class TimeflowOrchestratorProvider {
  private static _instance: TimeflowOrchestratorProvider

  public static getInstance (): TimeflowOrchestratorProvider {
    if (!this._instance) {
      this._instance = new TimeflowOrchestratorProvider()
    }

    return this._instance
  }

  private api = Axios.create({
    baseURL: process.env.VUE_APP_BASE_API
  })

  public signIn (email: string, password: string): Promise<AxiosResponse<SignInResponse>> {
    return this.api.post('/app/account/sign-in', {
      email,
      password
    })
  }

  public instances (search: string | null = null, offset = 0, limit = 15): Promise<AxiosResponse<InstancesResponse>> {
    return this.api.post('/app/instances/list', {
      access_token: process.env.VUE_APP_TEMPORARY_TOKEN,
      filter: {
        query: search
      },
      offset,
      limit
    })
  }
}
