interface IProductDetail {
  productname: string;
  productid: number;
}

export type PurchaseInquiry = {
  data: {
    email: string;
    firstname: string;
    lastname: string;
    phonenumber: number;
    productDetails: IProductDetail[];
    amount: number;
    message?: string;
    checked: boolean;
  };
};
