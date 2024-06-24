export interface ManufacturerOrdersProps {}

export interface OrderRequestType {
  distributorId: string;
  products: {
    productid: string;
    quantity: number;
  }[];
}
