import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrayResponseI } from 'src/models/array-response.interface';
import { BaseModel } from 'src/models/base-model';
import { ResponseI } from 'src/models/response.models';
import { BettweenAttribute, SearchModel } from 'src/models/search.model';

type RequestFunction<T> = (
  params: any,
  skip: number,
  top: number
) => Promise<ResponseI<ArrayResponseI<T>>>;
type TransformFunction<T extends BaseModel, C extends BaseModel> = (
  item: T
) => C;
const NUMBER_OF_ITEMS_ON_PAGE = 50;

interface ListManagerReturn<T, C> {
  entities: T[];
  data: C[];
  length: number;
  loading: boolean;
  requestFirstPage: () => void;
  requestNextPage: () => void;
  setSorting: (ordering: string) => void;
  setQuickSearch: (criteriaQuick: string) => void;
  clearFilters: () => void;
  addBetweenAttribute: (newBetweenAttribute: BettweenAttribute) => void;
  removeBetweenAttribute: (attr: string) => void;
}

export function useListManager<T extends BaseModel, C extends BaseModel>(
  requestFunction: RequestFunction<T>,
  transformFunction: TransformFunction<T, C>
): ListManagerReturn<T, C> {
  const [entities, setEntities] = useState<T[]>([]);
  const [length, setLength] = useState<number>(0);
  const [data, setData] = useState<C[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [bottomReached, setBottomReached] = useState<boolean>(false);
  const [skip, setSkip] = useState<number>(0);
  const [top, setTop] = useState<number>(NUMBER_OF_ITEMS_ON_PAGE);
  const [searchModel, setSearchModel] = useState<SearchModel>(
    new SearchModel()
  );

  const requestFirstPage = () => {
    setEntities([]);
    setData([]);
    setSkip(0);
  };

  const requestNextPage = () => {
    setSkip((prev) => prev + NUMBER_OF_ITEMS_ON_PAGE);
  };

  const setSorting = (sort: string) => {
    setEntities([]);
    setData([]);
    setSearchModel((prev) => ({ ...prev, ordering: sort }));
  };

  const setQuickSearch = (criteriaQuick: string) => {
    console.log('1: ', criteriaQuick);
    console.log('2: ', searchModel.criteriaQuick);
    if (criteriaQuick === searchModel.criteriaQuick) {
      return;
    } else {
      console.log('else');
    }
    setEntities([]);
    setData([]);
    setSkip(0);
    setSearchModel((prev) => {
      const newSearchModel: SearchModel = { ...prev, criteriaQuick };

      return newSearchModel;
    });
  };

  const clearFilters = () => {
    setSearchModel(new SearchModel());
    setEntities([]);
    setData([]);
    setSkip(0);
    setTop(50);
  };

  const addBetweenAttribute = (newBetweenAttribute: BettweenAttribute) => {
    setEntities([]);
    setData([]);
    setSkip(0);
    setSearchModel((prev) => {
      const newSearchModel = { ...prev };
      const prevAttrIndex = newSearchModel.betweenAttributes.findIndex(
        (x) => x.attribute === newBetweenAttribute.attribute
      );
      prevAttrIndex < 0
        ? newSearchModel.betweenAttributes.push(newBetweenAttribute)
        : (newSearchModel.betweenAttributes[prevAttrIndex] =
            newBetweenAttribute);

      return newSearchModel;
    });
  };

  const removeBetweenAttribute = (attr: string) => {
    setEntities([]);
    setData([]);
    setSkip(0);
    setSearchModel((prev) => {
      const newSearchModel = { ...prev };
      const prevAttrIndex = newSearchModel.betweenAttributes.findIndex(
        (x) => x.attribute === attr
      );
      if (prevAttrIndex >= 0) {
        newSearchModel.betweenAttributes.splice(prevAttrIndex, 1);
      }
      return newSearchModel;
    });
  };

  useEffect(() => {
    if (bottomReached) {
      return;
    }
    setLoading(true);
    requestFunction(searchModel, skip, top)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        setEntities((prev) => {
          const newEntities = [...prev, ...data.entities];
          setLength(newEntities.length);
          if (newEntities.length >= data.totalCount) {
            setBottomReached(true);
          }
          return newEntities;
        });
        setData((prev) => [...prev, ...data.entities.map(transformFunction)]);
      })
      .finally(() => setLoading(false));
  }, [
    requestFunction,
    transformFunction,
    skip,
    top,
    searchModel,
    bottomReached,
  ]);

  return {
    entities,
    data,
    length,
    loading,
    requestFirstPage,
    requestNextPage,
    setSorting,
    setQuickSearch,
    clearFilters,
    addBetweenAttribute,
    removeBetweenAttribute,
  };
}
