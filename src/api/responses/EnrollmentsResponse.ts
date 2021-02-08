import { PaginableResponse, SuccesubleResponse } from './CommonResponses'

export interface EnrollmentsResponse extends SuccesubleResponse, PaginableResponse {
  enrollments: Array<Enrollment>;
}

interface Enrollment {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company_name: string;
  country: string;
  token: string;
  token_active_until: string;
  created_at: string;
  activated_at: string;
}
