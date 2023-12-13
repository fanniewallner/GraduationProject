export type IProduct = {
  image: {
    data: {
      attributes: {
        formats: {
          thumbnail: {
            url: string;
          };
          small: {
            url: string;
          };
        };
      };
    };
  };
  title: string;
  price: string;
  description: string;
  specification: string;
  id: string;
  category: number;
};
