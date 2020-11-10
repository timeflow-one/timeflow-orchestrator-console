export interface UpdateUserRequest {
  id: number;
  user: Partial<User>;
}

interface User {
  email: string;
  // name: string;
  full_name: string;
  is_active: 1 | 0;
  is_deleted: 1 | 0;
  role: string;
}
