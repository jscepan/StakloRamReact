import { BaseModel } from './base-model';
import { BuyerModel } from './buyer.model';
import { ImageModel } from './image.model';
import { WorkOrderItemModel } from './work-order-item';

export class WorkOrderModel extends BaseModel {
  number = '';
  dateOfCreate: Date = new Date();
  placeOfIssue = '';
  forPerson = '';
  description = '';
  note = '';
  buyer: BuyerModel = new BuyerModel();
  workOrderItems: WorkOrderItemModel[] = [];
  images: ImageModel[] = [];
}
