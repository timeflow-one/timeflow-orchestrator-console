export interface UpdateInstanceRequest {
  id: number;
  instance: Partial<Instance>;
}

interface Instance {
  name: string;
  db_host: string;
  db_name: string;
  db_password: string;
  db_username: string;
  dadata_api_key: string;
  vi_api_key: string;
}
