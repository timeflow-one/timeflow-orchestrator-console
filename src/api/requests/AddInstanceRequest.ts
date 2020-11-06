export interface AddInstanceRequest {
  instance: Instance;
  user: User;
}

interface Instance {
  name: string;
  db_host: string;
  db_name: string;
  db_password: string;
  db_username: string;
  dadata_api_key: string;
  vi_api_key: string;
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
