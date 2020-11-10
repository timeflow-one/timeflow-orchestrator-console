export interface InstanceResponse {
  success: boolean;
  instance: Instance;
}

interface Instance {
  id: number;
  name: string;
  db_host: string;
  db_name: string;
  db_username: string;
  db_password: string;
  is_deleted: number;
  created_at: string;
  vi_api_key: string;
  dadata_api_key: string;
  pin: string;
  requires_upgrade: boolean;
  stats: Stats;
}

interface Stats {
  employees: Employees;
  license: License;
}

interface Employees {
  active: number;
  licensed: number;
}

interface License {
  valid_until: string;
  duration: number;
}
