import { BaseModel } from './base-model';

export class WorkOrderItemModel extends BaseModel {
  description = '';
  uom = '';
  dimension1 = 0;
  dimension2 = 0;
  dimension3 = 0;
  quantity = 0;
  sumQuantity = 0;
  note = '';
  settled = false;
}
