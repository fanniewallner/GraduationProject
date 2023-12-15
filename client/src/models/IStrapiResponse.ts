import { IProduct } from "./IProduct";

export type IStrapiSingleResponse = {
  data: IProduct;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

export type IStrapiListResponse = {
  data: IProduct[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};
