import Axios, { AxiosResponse } from 'axios'
import { AddInstanceRequest } from './requests/AddInstanceRequest'
import { AddInstanceResponse } from './responses/AddInstanceResponse'
import { InstancesResponse } from './responses/InstancesResponse'
import { PlansResponse } from './responses/PlansResponse'
import { SignInResponse } from './responses/SignInResponse'
import { UsersResponse } from './responses/UsersResponse'

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
      access_token: localStorage.getItem(process.env.VUE_APP_TOKEN_KEY),
      filters: {
        query: search
      },
      offset,
      limit
    })
  }

  public users (search: string | null = null, isDeleted: boolean | null = false, offset = 0, limit = 20): Promise<AxiosResponse<UsersResponse>> {
    return this.api.post('/app/users/list', {
      access_token: localStorage.getItem(process.env.VUE_APP_TOKEN_KEY),
      filters: {
        query: search,
        deleted: isDeleted
      },
      offset,
      limit
    })
  }

  public plans (): Promise<AxiosResponse<PlansResponse>> {
    return this.api.post('/app/plans/list', {
      access_token: localStorage.getItem(process.env.VUE_APP_TOKEN_KEY)
    })
  }

  public addInstance (request: AddInstanceRequest): Promise<AxiosResponse<AddInstanceResponse>> {
    return this.api.post('/app/instances/create', {
      access_token: localStorage.getItem(process.env.VUE_APP_TOKEN_KEY),
      ...request
    })
  }

  public removeInstance (id: number) {
    return this.api.post('/app/instances/delete', {
      access_token: localStorage.getItem(process.env.VUE_APP_TOKEN_KEY),
      id
    })
  }
}
