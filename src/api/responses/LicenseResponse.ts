import { SuccesubleResponse } from './CommonResponses'
import { License } from './LicensesResponse'

export interface LicenseResponse extends SuccesubleResponse {
  license: License;
}
