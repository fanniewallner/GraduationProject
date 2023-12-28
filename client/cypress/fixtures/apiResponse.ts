import { IStrapiListResponse } from "../../src/models/IStrapiResponse";
export const apiResponse: IStrapiListResponse = {
  data: [
    {
      id: 1,
      attributes: {
        name: "Kangaroo",
        description: "string",
        specification: "string",
        price: "string",
        createdAt: "string",
        updatedAt: "string",
        publishedAt: "string",
        stockStatus: "string",
        image: {
          data: {
            attributes: {
              formats: {
                thumbnail: {
                  url: "string",
                },
                small: {
                  url: "string",
                  hash: "string",
                },
                medium: {
                  url: "string",
                  hash: "string",
                },
                large: {
                  url: "string",
                  hash: "string",
                },
              },
            },
          },
        },
        category: {
          data: {
            id: 1,
          },
        },
      },
    },
  ],
  meta: {
    pagination: {
      page: 1,
      pageSize: 10,
      pageCount: 1,
      total: 2,
    },
  },
};
