export type PurchaseInquiry = {
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

export type EmailData = {
  toEmail: string;
  subject: string;
  content: string;
};
