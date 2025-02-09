import { constructUrl } from 'src/common/utils';
import { BASE_API_URL } from '../common/constants';
import { ResponseI } from '../models/response.models';
import { HttpService } from './http.service';
import { ArrayResponseI } from 'src/models/array-response.interface';
import { SearchModel } from 'src/models/search.model';
import { BaseModel } from 'src/models/base-model';

const BaseApiService = {
  searchEntities: async <T>(
    domainName: string,
    data: SearchModel,
    skip = 0,
    top = 50
  ): Promise<ResponseI<ArrayResponseI<T>>> => {
    const url: string = constructUrl(
      `${BASE_API_URL + '/' + domainName}/search`,
      skip,
      top
    );
    return HttpService.post(url, data);
  },

  getEntityByOid: async <T>(
    domainName: string,
    oid: string
  ): Promise<ResponseI<T>> => {
    return HttpService.get(
      `${BASE_API_URL + '/' + domainName}/${encodeURI(oid)}`
    );
  },

  createEntity: async <T>(
    domainName: string,
    data: T
  ): Promise<ResponseI<T>> => {
    return HttpService.post(`${BASE_API_URL + '/' + domainName}`, data);
  },

  updateEntity: async <T>(
    domainName: string,
    entityOID: string,
    data: Partial<T>
  ): Promise<ResponseI<T>> => {
    return HttpService.put(
      `${BASE_API_URL + '/' + domainName}/${encodeURI(entityOID)}`,
      data
    );
  },

  deleteEntity: async (
    domainName: string,
    data: BaseModel[]
  ): Promise<ResponseI<void>> => {
    return HttpService.delete(`${BASE_API_URL + '/' + domainName}`, { data });
  },
};

export const createApiService = <T>(domainName: string) => ({
  searchEntities: (data: SearchModel, skip = 0, top = 50) =>
    BaseApiService.searchEntities<T>(domainName, data, skip, top),

  getEntityByOid: (oid: string) =>
    BaseApiService.getEntityByOid<T>(domainName, oid),

  createEntity: (data: T) => BaseApiService.createEntity<T>(domainName, data),

  updateEntity: (entityOID: string, data: Partial<T>) =>
    BaseApiService.updateEntity<T>(domainName, entityOID, data),

  deleteEntity: (data: BaseModel[]) =>
    BaseApiService.deleteEntity(domainName, data),
});
