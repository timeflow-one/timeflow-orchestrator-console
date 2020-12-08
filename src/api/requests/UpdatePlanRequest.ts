export interface UpdatePlanRequest {
  id: number;
  plan: Plan;
}

interface Plan {
  title: string;
  code: string;
  employees_limit: number;
  monthly_fee: number;
  currency: string;
}
