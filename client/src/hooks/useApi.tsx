import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { IStrapiResponse } from "../models/IProductcard";

const useApi = (uri: string) => {
  const [data, setData] = useState<IStrapiResponse | null>();
  const [loading, setLoading] = useState<Boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<IStrapiResponse> = await axios.get(uri);
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
};

export default useApi;
