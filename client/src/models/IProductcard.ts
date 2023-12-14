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
            hash: string;
          };
          medium: {
            url: string;
            hash: string;
          };
          large: {
            url: string;
            hash: string;
          };
        };
      };
    };
  };
  name: string;
  price: string;
  description: string;
  specification: string;
  id: number;
  category: {
    data: {
      id: number;
    };
  };
};
