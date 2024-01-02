import { IContact } from "./IContact";
import { IMediaGallery } from "./IMediaGallery";
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

export type IStrapiMediaResponse = {
  data: IMediaGallery[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

export type IStrapiContactResponse = {
  data: IContact;
  meta: {};
};
