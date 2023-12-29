import { useContext } from "react";
import { AppConfigContext } from "../contexts/ApiContext";
import axios, { AxiosResponse } from "axios";
import {
  IStrapiContactResponse,
  IStrapiListResponse,
  IStrapiSingleResponse,
} from "../models/IStrapiResponse";
import { PurchaseInquiry } from "../models/PurchaseInquiry";
import { IConditions } from "../models/IConditions";
import { IContactFormDetails } from "../models/IContactFormDetails";
import { ICompanyDetails } from "../models/ICompanyDetails";

export default function useApi(url?: string) {
  const config = useContext(AppConfigContext);
  const axiosInstance = axios.create({
    baseURL: url ? url : config.apiBaseUrl,
  });
  const api = {
    getProducts: async () => {
      return axiosInstance.get<IStrapiListResponse>("/api/products?populate=*");
    },
    getProductById: async (id: string) => {
      return axiosInstance.get<IStrapiSingleResponse>(
        `/api/products/${id}?populate=*`
      );
    },
    getContactInfo: async () => {
      return axiosInstance.get<IStrapiContactResponse>("/api/contact-detail");
    },
    submitForm: async (data: PurchaseInquiry) => {
      return axiosInstance.post("/api/orders", data);
    },
    sendContactForm: async (data: IContactFormDetails) => {
      return axiosInstance.post("api/contact-forms", data);
    },
    getPurchaseConditions: async () => {
      return axiosInstance.get<IConditions>("/api/purchase-condition");
    },
    getCompanyDetails: async () => {
      return axiosInstance.get<ICompanyDetails>("api/company");
    },
  };
  return api;
}
