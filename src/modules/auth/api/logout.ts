import { Service } from 'typedi';
import { baseApi, HttpService } from '../../../api';

@Service()
export class LogoutApi extends HttpService {
  constructor() {
    super(baseApi);
  }

  logoutUser() {
    return this.execute<{}>({
      url: '/account/logout',
      method: 'post',
    });
  }
}
