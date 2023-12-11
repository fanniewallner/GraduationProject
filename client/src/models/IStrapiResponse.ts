export type IStrapiResponse<T> = {
  data: {
    attributes: T;
    id: number;
  }[];
  meta: {
    pagination: number;
  };
};
