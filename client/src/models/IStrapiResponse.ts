import { IContact } from "./IContact";
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
};

export type IStrapiContactResponse = {
  data: IContact;
  meta: {};
};
