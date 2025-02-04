import { BASE_API_URL } from '../common/constants';
import { AuthRequestModel } from '../models/auth-request.model';
import { AuthModel } from '../models/auth.model';
import { ResponseI } from '../models/response.models';
import { HttpService } from './http.service';

export const AuthenticationService = {
  login: (data: AuthRequestModel): Promise<ResponseI<AuthModel>> => {
    return HttpService.post(`${BASE_API_URL}/auth/login`, data);
  },

  changePassword: (data: {
    username: string;
    oldPassword: string;
    newPassword: string;
  }): Promise<ResponseI<{ jwt: string }>> => {
    return HttpService.post(`${BASE_API_URL}/auth/password-change`, data);
  },
};
