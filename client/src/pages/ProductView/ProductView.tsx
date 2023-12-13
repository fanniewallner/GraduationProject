import { IProduct } from "../../models/IProductcard";

type IProductViewProps = {
  product: IProduct;
};

export const ProductView = (product: IProductViewProps) => {
  return <h1>Du klickade på produkten med namn {product.product.title}</h1>;
};
