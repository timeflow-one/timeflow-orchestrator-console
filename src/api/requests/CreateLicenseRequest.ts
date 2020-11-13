export interface CreateLicenseRequest {
  license: License;
}

interface License {
  instance_id: number;
  plan_id: number;
  effective_date: string;
  valid_until: string;
}
