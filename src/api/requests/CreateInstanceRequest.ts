export interface CreateInstanceRequest {
  instance: Instance;
  user: User;
}

interface Instance {
  name: string;
  db_host: string;
  db_name: string;
  db_password: string;
  db_username: string;
  licenses: License;
}

interface License {
  plan_id: number;
  valid_until: string;
}

interface User {
  full_name: string;
  email: string;
  password: string;
}
