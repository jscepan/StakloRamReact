import { BaseModel } from './base-model';
import { BuyerModel } from './buyer.model';

export class IncomeModel extends BaseModel {
  date: Date = new Date();
  bankStatementNumber = '';
  amount = 0;
  comment = '';
  buyer: BuyerModel = new BuyerModel();
}
