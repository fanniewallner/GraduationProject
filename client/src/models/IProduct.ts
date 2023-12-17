export type IProduct = {
  id: number;
  attributes: {
    name: string;
    description: string;
    specification: string;
    price: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    stockStatus?: string;
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
    category: {
      data: {
        id: number;
      };
    };
  };
};
