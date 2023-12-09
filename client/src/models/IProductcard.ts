export type IProduct = {
  image: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
  title: string;
  price: number;
  description: string;
  specification: string;
  id: string;
};

export type IStrapiResponse = {
  data: {
    attributes: IProduct;
    id: number;
  }[];
  meta: {
    pagination: number;
  };
};
