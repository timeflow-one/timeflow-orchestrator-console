import { SuccesubleResponse } from './CommonResponses'

export interface DurationsResponse extends SuccesubleResponse {
  success: boolean;
  durations: Array<number>;
}
