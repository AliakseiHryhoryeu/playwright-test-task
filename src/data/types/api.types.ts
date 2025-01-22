export interface IRequestOptions {
    baseURL?: string;
    url: string;
    method: "get" | "post" | "put" | "delete";
    data?: object;
    headers?: Record<string, string>;
  }
  
  export interface IResponse<T extends IResponseFields> {
    status: number;
    body: T;
    headers: object;
  }
  
  export enum STATUS_CODES {
    OK = 200,
    CREATED = 201,
    DELETED = 204,
    INVALID_REQUEST = 400,
  }
  
  export interface IResponseFields {
    IsSuccess: boolean;
    ErrorMessage: string | null;
  }