import { useContext } from "react";
import { AppConfigContext } from "../contexts/ApiContext";
import axios from "axios";
import {
  IStrapiListResponse,
  IStrapiSingleResponse,
} from "../models/IStrapiResponse";
import { IContact } from "../models/IContact";
import { IProduct } from "../models/IProduct";

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
      return axiosInstance.get<IContact>("/api/contact");
    },
  };
  return api;
}
