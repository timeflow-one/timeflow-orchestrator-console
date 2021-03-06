import { PaginableResponse, SuccesubleResponse } from './CommonResponses'
import { Instance } from './InstancesResponse'
import { Plan } from './PlansResponse'

export interface LicensesResponse extends SuccesubleResponse, PaginableResponse {
  licenses: Array<License>;
}

export interface License {
  id: number;
  instance_id: number;
  plan_id: number;
  effective_date: string;
  valid_until: string;
  to_delete_on: null;
  created_at: string;
  promised_payment_until: null;
  plan_title: null;
  monthly_fee: number;
  duration: number;
  is_active: number;
  can_promise_payment: 0 | 1;
  subscription_id: string;
  instance: Instance;
  plan: Plan;
  unpaid_bill: UnpaidBill;
}

interface UnpaidBill {
  id: number;
  instance_id: number;
  title: string;
  to_pay_on: string;
  paid_amount: number;
  amount: number;
  currency: string;
  status: string;
  status_reason: null;
  paid_at: null;
  transaction_no: string;
  created_at: string;
  inn: string;
  kpp: null;
  legal_title: string;
  contact_email: string;
  contact_name: string;
  used_cc_token: null;
  link: null;
  is_deleted: number;
}
