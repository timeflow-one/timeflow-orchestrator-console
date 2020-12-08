import { SuccesubleResponse } from './CommonResponses'
import { Plan } from './PlansResponse'

export interface PlanResponse extends SuccesubleResponse {
  plan: Plan;
}
