import { BaseModel } from './base-model';
import { RoleModel } from './role.model';

export class UserModel extends BaseModel {
  displayName = '';
  username = '';
  enabled = true;
  fullName = '';
  email = '';
  language = '';
  roles: RoleModel[] = [];
}
