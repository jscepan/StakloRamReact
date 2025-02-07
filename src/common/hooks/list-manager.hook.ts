import { useEffect, useReducer } from 'react';
import { ArrayResponseI } from 'src/models/array-response.interface';
import { BaseModel } from 'src/models/base-model';
import { ResponseI } from 'src/models/response.models';
import { BettweenAttribute, SearchModel } from 'src/models/search.model';

enum ActionType {
  SET_ENTITIES = 'SET_ENTITIES',
  ADD_ENTITIES = 'ADD_ENTITIES',
  SET_DATA = 'SET_DATA',
  ADD_DATA = 'ADD_DATA',
  SET_TOTAL_COUNT = 'SET_TOTAL_COUNT',
  SET_LOADING = 'SET_LOADING',
  SET_SKIP = 'SET_SKIP',
  SET_TOP = 'SET_TOP',
  SET_SEARCH_MODEL = 'SET_SEARCH_MODEL',
  CLEAR_FILTERS = 'CLEAR_FILTERS',
}

type Action<T, C> =
  | { type: ActionType.SET_ENTITIES; payload: T[] }
  | { type: ActionType.ADD_ENTITIES; payload: T[] }
  | { type: ActionType.SET_DATA; payload: C[] }
  | { type: ActionType.ADD_DATA; payload: C[] }
  | { type: ActionType.SET_TOTAL_COUNT; payload: number }
  | { type: ActionType.SET_LOADING; payload: boolean }
  | { type: ActionType.SET_SKIP; payload: number }
  | { type: ActionType.SET_TOP; payload: number }
  | { type: ActionType.SET_SEARCH_MODEL; payload: SearchModel }
  | { type: ActionType.CLEAR_FILTERS };

interface State<T, C> {
  entities: T[];
  data: C[];
  totalCount: number;
  length: number;
  loading: boolean;
  skip: number;
  top: number;
  searchModel: SearchModel;
  bottomReached: boolean;
}

const initialState = <T, C>(): State<T, C> => ({
  entities: [],
  data: [],
  totalCount: 0,
  length: 0,
  loading: true,
  skip: 0,
  top: 50,
  searchModel: new SearchModel(),
  bottomReached: false,
});

function listManagerReducer<T, C>(
  state: State<T, C>,
  action: Action<T, C>
): State<T, C> {
  switch (action.type) {
    case ActionType.SET_ENTITIES:
      return {
        ...state,
        entities: action.payload,
        bottomReached: action.payload.length >= state.totalCount,
        length: action.payload.length,
      };
    case ActionType.ADD_ENTITIES:
      return {
        ...state,
        entities: [...state.entities, ...action.payload],
        bottomReached:
          state.entities.length + action.payload.length >= state.totalCount,
        length: state.entities.length + action.payload.length,
      };
    case ActionType.SET_TOTAL_COUNT:
      return { ...state, totalCount: action.payload };
    case ActionType.SET_DATA:
      return { ...state, data: action.payload };
    case ActionType.ADD_DATA:
      return { ...state, data: [...state.data, ...action.payload] };
    case ActionType.SET_LOADING:
      return { ...state, loading: action.payload };
    case ActionType.SET_SKIP:
      return { ...state, skip: action.payload };
    case ActionType.SET_TOP:
      return { ...state, top: action.payload };
    case ActionType.SET_SEARCH_MODEL:
      return { ...state, searchModel: action.payload };
    case ActionType.CLEAR_FILTERS:
      return initialState<T, C>();
    default:
      return state;
  }
}

type RequestFunction<T> = (
  data: SearchModel,
  skip: number,
  top: number
) => Promise<ResponseI<ArrayResponseI<T>>>;
type TransformFunction<T extends BaseModel, C extends BaseModel> = (
  item: T
) => C;

interface ListManagerReturn<T, C> {
  entities: T[];
  data: C[];
  length: number;
  totalCount: number;
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
  const [state, dispatch] = useReducer(
    listManagerReducer<T, C>,
    initialState<T, C>()
  );
  const {
    entities,
    data,
    length,
    totalCount,
    loading,
    bottomReached,
    skip,
    top,
    searchModel,
  } = state;
  const resetState = <T, C>(dispatch: React.Dispatch<Action<T, C>>) => {
    dispatch({ type: ActionType.SET_ENTITIES, payload: [] });
    dispatch({ type: ActionType.SET_DATA, payload: [] });
    dispatch({ type: ActionType.SET_SKIP, payload: 0 });
  };

  const requestFirstPage = () => {
    resetState(dispatch);
  };

  const requestNextPage = () => {
    dispatch({ type: ActionType.SET_SKIP, payload: skip + 50 });
  };

  const setSorting = (sort: string) => {
    resetState(dispatch);
    dispatch({
      type: ActionType.SET_SEARCH_MODEL,
      payload: { ...searchModel, ordering: sort },
    });
  };

  const setQuickSearch = (criteriaQuick: string) => {
    if (criteriaQuick === searchModel.criteriaQuick) return;
    resetState(dispatch);
    dispatch({
      type: ActionType.SET_SEARCH_MODEL,
      payload: { ...searchModel, criteriaQuick },
    });
  };

  const clearFilters = () => {
    dispatch({ type: ActionType.CLEAR_FILTERS });
  };

  const addBetweenAttribute = (newBetweenAttribute: BettweenAttribute) => {
    resetState(dispatch);
    dispatch({
      type: ActionType.SET_SEARCH_MODEL,
      payload: {
        ...searchModel,
        betweenAttributes: [
          ...searchModel.betweenAttributes,
          newBetweenAttribute,
        ],
      },
    });
  };

  const removeBetweenAttribute = (attr: string) => {
    resetState(dispatch);
    dispatch({
      type: ActionType.SET_SEARCH_MODEL,
      payload: {
        ...searchModel,
        betweenAttributes: searchModel.betweenAttributes.filter(
          (item) => item.attribute !== attr
        ),
      },
    });
  };

  useEffect(() => {
    if (bottomReached) return;
    dispatch({ type: ActionType.SET_LOADING, payload: true });

    requestFunction(searchModel, skip, top)
      .then((res) => res.data)
      .then((data) => {
        dispatch({
          type: ActionType.SET_TOTAL_COUNT,
          payload: data.totalCount,
        });
        dispatch({
          type: ActionType.ADD_ENTITIES,
          payload: data.entities,
        });
        dispatch({
          type: ActionType.ADD_DATA,
          payload: [...data.entities.map(transformFunction)],
        });
      })
      .finally(() => {
        dispatch({ type: ActionType.SET_LOADING, payload: false });
      });
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
    totalCount,
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
