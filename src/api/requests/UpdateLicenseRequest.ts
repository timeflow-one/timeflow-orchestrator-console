export interface UpdateLicenseRequest {
  id: number;
  license: Partial<License>;
}

interface License {
  instance_id: number;
  plan_id: number;
  effective_date: string;
  valid_until: string;
}
