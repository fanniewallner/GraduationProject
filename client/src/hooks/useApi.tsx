import { useContext } from "react";
import { AppConfigContext } from "../contexts/ApiContext";
import axios from "axios";
import { IProduct } from "../models/IProductcard";
import { IStrapiResponse } from "../models/IStrapiResponse";
import { IContact } from "../models/IContact";

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
    getContactInfo: async () => {
      return axiosInstance.get<IContact>("/api/contact");
    },
  };
  return api;
}
