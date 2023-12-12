/* 
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


export default useApi;
 */

import { useContext } from "react";
import { AppConfigContext } from "../contexts/ApiContext";
import axios from "axios";
import { IProduct } from "../models/IProductcard";
import { IStrapiResponse } from "../models/IStrapiResponse";

export default function useApi(url?: string) {
  const config = useContext(AppConfigContext);
  const axiosInstance = axios.create({
    baseURL: url ? url : config.apiBaseUrl,
  });
  const api = {
    getProducts: async () => {
      return axiosInstance.get<IStrapiResponse<IProduct>>(
        "/api/products?populate=*"
      );
    },
    getProductById: async (id: string) => {
      return axiosInstance.get<IProduct>(`/api/products/${id}`);
    },
  };
  return api;
}
