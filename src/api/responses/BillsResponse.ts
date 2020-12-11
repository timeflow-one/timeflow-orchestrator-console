import { PaginableResponse, SuccesubleResponse } from './CommonResponses'
import { Instance } from './InstancesResponse'
import { License } from './LicensesResponse'

export interface BillsResponse extends SuccesubleResponse, PaginableResponse {
  bills: Array<Bill>;
}

interface Bill {
  amount: number;
  contact_email: string;
  contact_name: string;
  created_at: string;
  currency: string;
  id: number;
  inn: string;
  instance_id: number;
  is_deleted: number;
  kpp: null;
  legal_title: string;
  link: null;
  paid_amount: number;
  paid_at: null;
  status: string;
  status_reason: null;
  title: string;
  to_pay_on: string;
  transaction_no: string;
  used_cc_token: null;
  instance: Instance;
  license: License;
}
