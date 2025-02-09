import { DOMAIN_BUYERS } from '../common/constants';
import { createApiService } from './entity-base-web.service';
import { BuyerModel } from 'src/models/buyer.model';

export const BuyerService = createApiService<BuyerModel>(DOMAIN_BUYERS);
