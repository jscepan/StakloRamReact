import { BASE_API_URL, DOMAIN_USERS } from '../common/constants';
import { ResponseI } from '../models/response.models';
import { UserModel } from '../models/user.model';
import { HttpService } from './http.service';

export const UserService = {
  getCurrentUserProfile: (): Promise<ResponseI<UserModel>> => {
    return HttpService.get(`${BASE_API_URL}/${DOMAIN_USERS}/profile`);
  },
};
