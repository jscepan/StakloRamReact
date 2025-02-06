import { useCallback, useEffect, useState } from 'react';
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
  const [data, setData] = useState<C[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
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
    console.log(criteriaQuick);
  };
  //   const setSearch = useCallback(
  //     (criteriaQuick: string) => {
  //       setEntities([]);
  //       setData([]);
  //       setSearchModel((prev) => {
  //         console.log('1');
  //         if (prev.criteriaQuick === criteriaQuick) {
  //           console.log('xxx');
  //           return prev;
  //         }
  //         return { ...prev, criteriaQuick };
  //       });
  //     },
  //     [setSearchModel]
  //   );
  const clearFilters = () => {
    setSearchModel(new SearchModel());
    setEntities([]);
    setData([]);
    setSkip(0);
    setTop(50);
  };

  const addBetweenAttribute = (newBetweenAttribute: BettweenAttribute) => {
    const prevAttrIndex = searchModel.betweenAttributes.findIndex(
      (x) => x.attribute === newBetweenAttribute.attribute
    );
    prevAttrIndex < 0
      ? searchModel.betweenAttributes.push(newBetweenAttribute)
      : (searchModel.betweenAttributes[prevAttrIndex] = newBetweenAttribute);
  };

  const removeBetweenAttribute = (attr: string) => {
    const prevAttrIndex = searchModel.betweenAttributes.findIndex(
      (x) => x.attribute === attr
    );
    if (prevAttrIndex >= 0) {
      searchModel.betweenAttributes.splice(prevAttrIndex, 1);
    }
  };

  useEffect(() => {
    setLoading(true);
    requestFunction(searchModel, skip, top)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        setEntities(data.entities);
        setData(data.entities.map(transformFunction));
      })
      .finally(() => setLoading(false));
  }, [requestFunction, transformFunction, skip, top, searchModel]);

  return {
    entities,
    data,
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
