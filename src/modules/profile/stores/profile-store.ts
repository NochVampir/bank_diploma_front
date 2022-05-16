import { makeAutoObservable } from 'mobx';
import { Inject, Service } from 'typedi';
import { TProfileDetailsResponse, TProfileLastActivityResponse } from '../../../api/types';
import { ProfileApi } from '../api/profile-api';
import { TExecuteResponse } from '../../../api';

export type TProfileDetails = TProfileDetailsResponse
export type TLastActivityItem = {
  type: 'increase' | 'decrease',
  value?: number
}

@Service()
export class ProfileStore {
  @Inject(() => ProfileApi)
  private profileApi: ProfileApi;

  isLoading = false;

  isLoadingLastActivity = false;

  isError = false;

  details: TProfileDetails | null = null;

  lastActivity: TLastActivityItem[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  * getLastActivity() {
    try {
      this.isLoading = true;
      const lastActivityResponse: TExecuteResponse<TProfileLastActivityResponse> = yield this
        .profileApi.getLastActivity();

      if (lastActivityResponse.data) {
        this.lastActivity = lastActivityResponse.data;
      }
    } catch (e) {
      console.log(e);
    }
  }

  * getProfileDetails() {
    try {
      this.isLoading = true;
      const detailsResponse: TExecuteResponse<TProfileDetailsResponse> = yield this
        .profileApi.getTokenDetails();

      if (detailsResponse.data) {
        this.details = detailsResponse.data;
      }
    } catch (e) {
      this.isError = true;
    } finally {
      this.isLoading = false;
    }
  }
}
