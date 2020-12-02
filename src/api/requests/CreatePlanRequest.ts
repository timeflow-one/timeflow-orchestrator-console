export interface CreatePlanRequest {
  plan: Plan;
}

interface Plan {
  title: string;
  code: string;
  currency: string;
  employees_limit: number;
  monthly_fee: number;
}
