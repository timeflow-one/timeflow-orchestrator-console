import { SuccesubleResponse } from './CommonResponses'
import { Plan } from './PlansResponse'

export interface CreatePlanResponse extends SuccesubleResponse {
  plan: Plan;
}
