import { constructUrl } from 'src/common/utils';
import { BASE_API_URL, DOMAIN_INCOMES } from '../common/constants';
import { ResponseI } from '../models/response.models';
import { HttpService } from './http.service';
import { ArrayResponseI } from 'src/models/array-response.interface';
import { SearchModel } from 'src/models/search.model';
import { IncomeModel } from 'src/models/income.model';

export const IncomeService = {
  searchEntities: (
    data: SearchModel,
    skip = 0,
    top = 50
  ): Promise<ResponseI<ArrayResponseI<IncomeModel>>> => {
    const url: string = constructUrl(
      `${BASE_API_URL + '/' + DOMAIN_INCOMES}/search`,
      skip,
      top
    );
    return HttpService.post(url, data);
  },
};
