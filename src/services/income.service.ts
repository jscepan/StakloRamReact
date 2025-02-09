import { DOMAIN_INCOMES } from '../common/constants';
import { IncomeModel } from 'src/models/income.model';
import { createApiService } from './entity-base-web.service';

export const IncomeService = createApiService<IncomeModel>(DOMAIN_INCOMES);
/*
export const BuyerService = {
    ...createApiService<BuyerModel>('buyers'),

    getTopBuyers: (limit: number) => {
      return HttpService.get<ResponseI<BuyerModel[]>>(
        `${BASE_API_URL}/buyers/top?limit=${limit}`
      );
    },
  };
  export const BuyerService = {
    ...createApiService<BuyerModel>('buyers'),

    // Pregazimo createEntity da dodamo dodatnu logiku
    createEntity: (data: BuyerModel) => {
      console.log('Custom logika pre kreiranja kupca...');
      return HttpService.post<ResponseI<BuyerModel>>(`${BASE_API_URL}/buyers`, data);
    },
  };
  */
