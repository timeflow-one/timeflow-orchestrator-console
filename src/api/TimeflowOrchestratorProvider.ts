import { PreferenceKey } from '@/utils/PreferenceKey'
import Axios, { AxiosResponse } from 'axios'
import { CreateInstanceRequest } from './requests/CreateInstanceRequest'
import { CreateLicenseRequest } from './requests/CreateLicenseRequest'
import { UpdateInstanceRequest } from './requests/UpdateInstanceRequest'
import { UpdateLicenseRequest } from './requests/UpdateLicenseRequest'
import { UpdateUserRequest } from './requests/UpdateUserRequest'
import { CreateInstanceResponse } from './responses/CreateInstanceResponse'
import { DurationsResponse } from './responses/DurationsResponse'
import { InstanceResponse } from './responses/InstanceResponse'
import { InstancesResponse } from './responses/InstancesResponse'
import { LicenseResponse } from './responses/LicenseResponse'
import { LicensesResponse } from './responses/LicensesResponse'
import { PlansResponse } from './responses/PlansResponse'
import { SignInResponse } from './responses/SignInResponse'
import { UserResponse } from './responses/UserResponse'
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

  public users (search: string | null = null, isDeleted: boolean | null = false, offset = 0, limit = 20): Promise<AxiosResponse<UsersResponse>> {
    return this.api.post('/app/users/list', {
      access_token: localStorage.getItem(PreferenceKey.TOKEN_KEY),
      filters: {
        query: search,
        deleted: isDeleted
      },
      offset,
      limit
    })
  }

  public getUser (id: number): Promise<AxiosResponse<UserResponse>> {
    return this.api.post('/app/users/get', {
      access_token: localStorage.getItem(PreferenceKey.TOKEN_KEY),
      id
    })
  }

  public updateUser (request: UpdateUserRequest): Promise<AxiosResponse<any>> {
    return this.api.post('/app/users/update', {
      access_token: localStorage.getItem(PreferenceKey.TOKEN_KEY),
      ...request
    })
  }

  public plans (offset = 0, limit = 15): Promise<AxiosResponse<PlansResponse>> {
    return this.api.post('/app/plans/list', {
      access_token: localStorage.getItem(PreferenceKey.TOKEN_KEY),
      offset,
      limit
    })
  }

  public instances (search: string | null = null, offset = 0, limit = 15): Promise<AxiosResponse<InstancesResponse>> {
    return this.api.post('/app/instances/list', {
      access_token: localStorage.getItem(PreferenceKey.TOKEN_KEY),
      filters: {
        query: search
      },
      offset,
      limit
    })
  }

  public createInstance (request: CreateInstanceRequest): Promise<AxiosResponse<CreateInstanceResponse>> {
    return this.api.post('/app/instances/create', {
      access_token: localStorage.getItem(PreferenceKey.TOKEN_KEY),
      ...request
    })
  }

  public updateInstance (request: UpdateInstanceRequest): Promise<AxiosResponse<CreateInstanceRequest>> {
    return this.api.post('/app/instances/update', {
      access_token: localStorage.getItem(PreferenceKey.TOKEN_KEY),
      ...request
    })
  }

  public removeInstance (id: number): Promise<AxiosResponse<void>> {
    return this.api.post('/app/instances/delete', {
      access_token: localStorage.getItem(PreferenceKey.TOKEN_KEY),
      id
    })
  }

  public getInstance (id: number): Promise<AxiosResponse<InstanceResponse>> {
    return this.api.post('/app/instances/get', {
      access_token: localStorage.getItem(PreferenceKey.TOKEN_KEY),
      id
    })
  }

  public licenses (offset = 0, limit = 15): Promise<AxiosResponse<LicensesResponse>> {
    return this.api.post('/app/licenses/list', {
      access_token: localStorage.getItem(PreferenceKey.TOKEN_KEY),
      offset,
      limit
    })
  }

  public createLicense (request: CreateLicenseRequest): Promise<AxiosResponse<any>> {
    return this.api.post('/app/licenses/create', {
      access_token: localStorage.getItem(PreferenceKey.TOKEN_KEY),
      ...request
    })
  }

  public getLicense (id: number): Promise<AxiosResponse<LicenseResponse>> {
    return this.api.post('/app/licenses/get', {
      access_token: localStorage.getItem(PreferenceKey.TOKEN_KEY),
      id
    })
  }

  public updateLicense (request: UpdateLicenseRequest): Promise<AxiosResponse<LicenseResponse>> {
    return this.api.post('/app/licenses/update', {
      access_token: localStorage.getItem(PreferenceKey.TOKEN_KEY),
      ...request
    })
  }

  public durations (): Promise<AxiosResponse<DurationsResponse>> {
    return this.api.post('/app/instances/durations', {
      access_token: localStorage.getItem(PreferenceKey.TOKEN_KEY)
    })
  }
}
