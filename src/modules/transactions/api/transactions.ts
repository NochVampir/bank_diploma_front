import { Service } from 'typedi';
import { baseApi, HttpService } from '../../../api';
import {
  TSendTransactionPayload,
  TSendTransactionResponse,
  TUserSuggestionsPayload,
  TUserSuggestionsResponse,
  TUserTransactionsPayload,
  TUserTransactionsResponse,
} from '../../../api/types';

@Service()
export class TransactionsApi extends HttpService {
  constructor() {
    super(baseApi);
  }

  getUsersSuggestions(payload: TUserSuggestionsPayload) {
    return this.execute<TUserSuggestionsResponse>({
      url: '/account/find',
      params: {
        q: payload.q,
      },
    });
  }

  getTransactionsList(payload: TUserTransactionsPayload) {
    return this.execute<TUserTransactionsResponse>({
      url: `/transactions/${payload.id}/list`,
      params: payload.sort ? {
        sortName: payload.sort.name,
        sortDir: payload.sort.dir,
      } : undefined,
    });
  }

  provideTransaction(payload: TSendTransactionPayload) {
    return this.execute<TSendTransactionResponse>({
      url: '/transactions',
      data: payload,
      method: 'post',
    });
  }
}
