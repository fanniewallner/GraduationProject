import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { IStrapiResponse } from "../models/IStrapiResponse";

export const PRODUCT_ENDPOINT = "/api/products?populate=*";
export const CONTACT_ENDPOINT = "/api/contact?populate=*;";

function useApi<T>(uri: string) {
  const [data, setData] = useState<IStrapiResponse<T>>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<IStrapiResponse<T>> = await axios.get(
          `http://localhost:1337${uri}`
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error as Error);
        setLoading(false);
      }
    };
    fetchData();
  }, [uri]);

  return { loading, error, data };
}

export default useApi;
