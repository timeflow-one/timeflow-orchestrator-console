import Axios, { AxiosResponse } from 'axios'
import { InstancesResponse } from './responses/InstancesResponse'

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

  public instances (offset = 0, limit = 15): Promise<AxiosResponse<InstancesResponse>> {
    return this.api.post('/app/instances/list', {
      access_token: process.env.VUE_APP_TEMPORARY_TOKEN,
      offset,
      limit
    })
  }
}
