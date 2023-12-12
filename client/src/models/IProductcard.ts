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
  category: number;
};
