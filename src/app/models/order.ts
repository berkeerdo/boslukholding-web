export type Order = {
  id: number;
  buyerId: string;
  shippingAddress: {
    fullName: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;
  };
  orderDate: string;
  orderItems: {
    productId: number;
    name: string;
    price: number;
    pictureUrl: string;
    quantity: number;
  }[];
  subTotal: number;
  deliveryFee: number;
  orderStatus: string;
  total: number;
};
