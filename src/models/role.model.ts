import { BaseModel } from './base-model';

export class RoleModel extends BaseModel {
  name = '';
  privileges: string[] = [];
}
