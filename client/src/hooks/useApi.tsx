import { useContext } from "react";
import { AppConfigContext } from "../contexts/ApiContext";
import axios from "axios";
import {
  IStrapiContactResponse,
  IStrapiListResponse,
  IStrapiSingleResponse,
} from "../models/IStrapiResponse";

export default function useApi(url?: string) {
  const config = useContext(AppConfigContext);
  const axiosInstance = axios.create({
    baseURL: url ? url : config.apiBaseUrl,
  });
  const api = {
    getProducts: async () => {
      return axiosInstance.get<IStrapiListResponse>("/api/products?populate=*");
    },
    getProductsByFiltering: async () => {
      return axiosInstance.get<IStrapiListResponse>("/api/products?populate=*");
    },

    getProductById: async (id: string) => {
      return axiosInstance.get<IStrapiSingleResponse>(
        `/api/products/${id}?populate=*`
      );
    },
    getContactInfo: async () => {
      return axiosInstance.get<IStrapiContactResponse>("/api/contact");
    },
  };
  return api;
}
