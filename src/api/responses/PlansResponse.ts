import { PaginableResponse, SuccesubleResponse } from './CommonResponses'

export interface PlansResponse extends SuccesubleResponse, PaginableResponse {
  plans: Array<Plan>;
}

export interface Plan {
  code: string;
  currency: string;
  employees_limit: number;
  id: number;
  is_deleted: number;
  monthly_fee: number;
  monthly_fee_text: string;
  title: string;
}
