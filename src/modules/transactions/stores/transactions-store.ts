import { makeAutoObservable } from 'mobx';
import { Inject, Service } from 'typedi';
import { TransactionsApi } from '../api/transactions';
import { TSendTransactionPayload, TUserTransactionsResponse } from '../../../api/types';
import { TExecuteResponse } from '../../../api';
import { ProfileStore } from '../../profile/stores/profile-store';

type TTransaction = {
  cost: number
  id: number
  senderId: number
  sender: {
    id: number
    nickname: string
  }
  recipient: {
    id: number
    nickname: string
  }
  createdAt: string
}

@Service()
export class TransactionsStore {
  @Inject(() => ProfileStore)
  private profileStore: ProfileStore;

  @Inject(() => TransactionsApi)
  private transactionsApi: TransactionsApi;

  isLoading: boolean;

  isLoadingList: boolean;

  isError: boolean;

  list: TTransaction[];

  sort: {
    name: string
    dir: string
  } = {
    name: 'createdAt',
    dir: 'asc',
  };

  constructor() {
    makeAutoObservable(this, {}, {
      autoBind: true,
    });
  }

  * getTransactionsList(sort?: {
    name: string,
    dir: string
  }) {
    this.isLoadingList = true;
    try {
      if (this.profileStore.details?.id) {
        const transactionsResponse:
          TExecuteResponse<TUserTransactionsResponse> = yield this
            .transactionsApi.getTransactionsList({
              id: this.profileStore.details?.id,
              sort,
            });

        if (transactionsResponse.data) {
          this.list = transactionsResponse.data;
        }
      }
    } catch (e) {
      this.isError = true;
    } finally {
      this.isLoadingList = false;
    }
  }

  * provideTransaction(payload: TSendTransactionPayload) {
    this.isLoading = true;
    try {
      yield this
        .transactionsApi
        .provideTransaction(payload);
    } catch (e) {
      this.isError = true;
    } finally {
      this.isLoading = false;
    }
  }
}
