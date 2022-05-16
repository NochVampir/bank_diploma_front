import { Service } from 'typedi';
import { authApi, HttpService } from '../../../api';
import {
  TLoginPayload, TLoginResponse, TRegisterPayload, TRegisterResponse,
} from '../../../api/types';

@Service()
export class AuthApi extends HttpService {
  constructor() {
    super(authApi);
  }

  registerUser(payload: TRegisterPayload) {
    return this.execute<TRegisterResponse>({
      url: '/account',
      data: payload,
      method: 'post',
    });
  }

  loginUser(payload: TLoginPayload) {
    return this.execute<TLoginResponse>({
      url: '/account/login',
      data: payload,
      method: 'post',
      withCredentials: true,
    });
  }
}
