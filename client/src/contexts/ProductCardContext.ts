import { Dispatch, createContext } from "react";
import { IProduct } from "../models/IProduct";
import { IProductAction } from "../reducers/ProductsReducer";

export const ProductCartContext = createContext<{
  state: IProduct[];
  dispatch: Dispatch<IProductAction>;
}>({
  state: [],
  dispatch: () => {
    return;
  },
});
