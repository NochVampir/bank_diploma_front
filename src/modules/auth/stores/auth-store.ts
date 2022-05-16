import { makeAutoObservable } from 'mobx';
import { Inject, Service } from 'typedi';
import Cookies from 'js-cookie';
import { TExecuteResponse } from '../../../api';
import { TLoginPayload, TLoginResponse, TRegisterPayload } from '../../../api/types';
import { ProfileStore } from '../../profile/stores/profile-store';
import { AuthApi } from '../api/auth';
import { LogoutApi } from '../api/logout';
import { history } from '../../../router';

@Service()
export class AuthStore {
  isLoading = false;

  isConfigured = false;

  isError = false;

  @Inject(() => ProfileStore)
  private profileStore: ProfileStore;

  @Inject(() => AuthApi)
  private authApi: AuthApi;

  @Inject(() => LogoutApi)
  private logoutApi: LogoutApi;

  constructor() {
    makeAutoObservable(this, {}, {
      autoBind: true,
    });
  }

  * registerUser(payload: TRegisterPayload) {
    this.isLoading = true;
    try {
      yield this.authApi.registerUser(payload);
    } catch (e) {
      this.isError = true;
    } finally {
      this.isLoading = false;
    }
  }

  * loginUser(payload: TLoginPayload) {
    this.isLoading = true;
    try {
      const loginResponse: TExecuteResponse<TLoginResponse> = yield this.authApi.loginUser(payload);
      if (loginResponse.data) {
        this.isConfigured = true;
        window.localStorage.setItem('accessToken', loginResponse.data.token);
        history.push('/profile');
      }
    } catch (e) {
      this.isError = true;
    } finally {
      this.isLoading = false;
    }
  }

  * logoutUser() {
    this.isConfigured = false;
    yield this.logoutApi.logoutUser();

    window.localStorage.removeItem('accessToken');
    Cookies.remove('refreshToken', { path: '' });

    history.push('/auth/login');
  }

  * initAuthSettings() {
    try {
      yield this.profileStore.getProfileDetails();
      this.isConfigured = true;
    } catch (e) {
      console.log(e);
    }
  }
}
