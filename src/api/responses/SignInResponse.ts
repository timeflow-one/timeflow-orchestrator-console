export interface SignInResponse {
  success: boolean;
  user: User;
}

interface User {
  id: number;
  access_token: string;
  token_id: number;
  created_at: string;
  email: string;
  full_name: string;
  is_active: 1 | 0;
  is_deleted: 1 | 0;
  password_token: null;
  role: string;
}
