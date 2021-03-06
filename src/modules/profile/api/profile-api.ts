import { Service } from 'typedi';
import { baseApi, HttpService } from '../../../api';
import {
  TFindByNumberTransactionPayload,
  TFindByNumberTransactionResponse,
  TProfileDetailsResponse, TProfileLastActivityResponse, TReplenishBalancePayload,
} from '../../../api/types';

@Service()
export class ProfileApi extends HttpService {
  constructor() {
    super(baseApi);
  }

  getTokenDetails() {
    return this.execute<TProfileDetailsResponse>({
      url: '/account/details',
    });
  }

  replenishBalance(payload: TReplenishBalancePayload) {
    return this.execute({
      url: '/account/replenish',
      method: 'put',
      data: payload,
    });
  }

  getLastActivity() {
    return this.execute<TProfileLastActivityResponse>({
      url: '/account/last-activity',
    });
  }

  findByNumber(payload: TFindByNumberTransactionPayload) {
    return this.execute<TFindByNumberTransactionResponse>({
      url: `/account/findByOperationNumber?operationNumber=${payload.number}`,
    });
  }
}
