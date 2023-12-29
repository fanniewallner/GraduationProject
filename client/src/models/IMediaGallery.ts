export type IMediaGallery = {
  attributes: {
    image: {
      data: [
        {
          attributes: {
            name: string;
            formats: {
              thumbnail: {
                url: string;
              };
            };
          };
        }
      ];
    };
  };
};
