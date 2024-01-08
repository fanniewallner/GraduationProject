import { IProduct } from "../models/IProduct";

export enum ActionType {
  ADDED_PRODUCT = "addedproduct",
  REMOVED_PRODUCT = "removedproduct",
  CLEARED_CART = "clearedcart",
}

export interface IProductAction {
  type: ActionType;
  payload?: IProduct;
}

export const initialCartState: IProduct[] = [];

export const ProductsReducer = (
  state: IProduct[],
  action: IProductAction
): IProduct[] => {
  switch (action.type) {
    case ActionType.ADDED_PRODUCT:
      return [...state, action.payload!];
    case ActionType.REMOVED_PRODUCT:
      return state.filter((product) => product.id !== action.payload!.id);
    case ActionType.CLEARED_CART:
      return [];
    default:
      return state;
  }
};
