export type PurchaseInquiry = {
  data: {
    email: string;
    firstname: string;
    lastname: string;
    phonenumber: number;
    productId: number;
    productname: string;
    amount: number;
    message?: string;
    checked: boolean;
  };
};
