import { PaginableResponse, SuccesubleResponse } from './CommonResponses'

export interface UsersResponse extends SuccesubleResponse, PaginableResponse {
  users: Array<User>;
}

interface User {
  id: number;
  access_token: string;
  token_id: number;
  created_at: string;
  email: string;
  name: string;
  full_name: string;
  is_active: 1 | 0;
  is_deleted: 1 | 0;
  password_token: null;
  role: string;
  instance: Instance;
}

interface Instance {
  id: number;
  name: string;
  db_name: string;
  created_at: string;
}
