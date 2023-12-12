/* import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { IStrapiResponse } from "../models/IStrapiResponse";

export const PRODUCT_ENDPOINT = "/api/products?populate=*";
export const CONTACT_ENDPOINT = "/api/contact";

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
 */
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { IStrapiResponse } from "../models/IStrapiResponse";
import { IContact } from "../models/IContact";

export const PRODUCT_ENDPOINT = "/api/products?populate=*";
export const CONTACT_ENDPOINT = "/api/contact";

function useApi<T>(uri: string, options?: AxiosRequestConfig) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>();

  const url = `http://localhost:1337${uri}`;

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get<T>(url, options);
      setData(response.data);
    } catch (error: unknown) {
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error };
}

export const getContactInfo = async (uri: string): Promise<IContact> => {
  const url = `http://localhost:1337${uri}`;
  const response = await axios.get(url);
  return response.data;
};

/* 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<T> = await axios.get(
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
 */
export default useApi;
