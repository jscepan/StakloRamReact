import { BaseModel } from './base-model';
import { CityModel } from './city.model';

export class BuyerModel extends BaseModel {
  type?: string;
  name = '';
  address = '';
  maticalNumber = '';
  pib = '';
  contactPerson = '';
  phoneNumberFix = '';
  phoneNumberMobile = '';
  email = '';
  gender?: string;
  city?: CityModel;
  jbkjs?: string;
  account?: string;
}
