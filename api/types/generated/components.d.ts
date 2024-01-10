import type { Schema, Attribute } from '@strapi/strapi';

export interface OderPurchase extends Schema.Component {
  collectionName: 'components_oder_purchases';
  info: {
    displayName: 'purchase';
    description: '';
  };
  attributes: {
    productname: Attribute.String;
    productid: Attribute.Integer;
  };
}

export interface ProductOrderProduct extends Schema.Component {
  collectionName: 'components_product_order_products';
  info: {
    displayName: 'order-product';
  };
  attributes: {
    name: Attribute.String;
    description: Attribute.Text;
    specification: Attribute.Text;
    price: Attribute.String;
    stockstatus: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'oder.purchase': OderPurchase;
      'product.order-product': ProductOrderProduct;
    }
  }
}
