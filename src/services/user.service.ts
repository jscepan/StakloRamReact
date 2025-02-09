import { BASE_API_URL, DOMAIN_USERS } from '../common/constants';
import { ResponseI } from '../models/response.models';
import { UserModel } from '../models/user.model';
import { createApiService } from './entity-base-web.service';
import { HttpService } from './http.service';

export const UserService = {
  ...createApiService<UserModel>(DOMAIN_USERS),

  getCurrentUserProfile: (): Promise<ResponseI<UserModel>> => {
    return HttpService.get(`${BASE_API_URL}/${DOMAIN_USERS}/profile`);
  },
};
