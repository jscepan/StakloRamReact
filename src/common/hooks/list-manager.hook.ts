import { useEffect, useState } from 'react';
import { ArrayResponseI } from 'src/models/array-response.interface';
import { BaseModel } from 'src/models/base-model';
import { ResponseI } from 'src/models/response.models';

type RequestFunction<T> = (
  params?: any
) => Promise<ResponseI<ArrayResponseI<T>>>;
type TransformFunction<T extends BaseModel, C extends BaseModel> = (
  item: T
) => C;

export function useListManager<T extends BaseModel, C extends BaseModel>(
  requestFunction: RequestFunction<T>,
  transformFunction: TransformFunction<T, C>,
  params?: any
): { data: C[]; loading: boolean } {
  const [data, setData] = useState<C[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    requestFunction(params)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        setData(data.entities.map(transformFunction));
      })
      .finally(() => setLoading(false));
  }, [params, requestFunction, transformFunction]);

  return { data, loading };
}
