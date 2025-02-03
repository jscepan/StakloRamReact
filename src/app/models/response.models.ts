export interface ResponseI<T> {
  config: any;
  data: T;
  headers: Headers;
  request: XMLHttpRequest;
  status: number;
  statusText: string;
}
