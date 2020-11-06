export interface AddInstanceResponse {
  success: boolean;
  instance: Instance;
}

interface Instance {
  id: number;
  name: string;
  licenses: Array<License>;
  pin: string;
  vi_api_key: string;
  is_deleted: number;
  db_host: string;
  db_name: string;
  db_password: string;
  db_username: string;
  dadata_api_key: string;
  created_at: string;
}

interface License {
  id: number;
  instance_id: number;
  plan_id: number;
  plan_title: string | null;
  effective_date: string;
  valid_until: string;
  can_promise_payment: number;
  duration: number;
  is_active: number;
  monthly_fee: number;
  promised_payment_until: null;
  subscription_id: null;
  to_delete_on: null;
}
