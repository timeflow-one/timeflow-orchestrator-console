import { SuccesubleResponse } from './CommonResponses'

export interface CurrenciesResponse extends SuccesubleResponse {
  currencies: {
    [key: string]: string;
  };
}
