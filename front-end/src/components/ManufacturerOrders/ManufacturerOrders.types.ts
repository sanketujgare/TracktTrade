import { DistributorType } from "../DistributorList/DistributorList.types";
import { productType } from "../Products/Products.types";

export interface ManufacturerOrdersProps {}

export interface OrderDataType {
  distributorId: string;
  products: {
    _id: string;
    productid: string;
    quantity: number;
  }[];
  status: string;
}

export interface DistributorOrderDataType {
  orderId: string;
  distributorId: string;
  name: String;
  status: string;
  productName: string;
  productPrice: string;
  productDescription: string;
  productImage: string;
  quantity: string;
}

export interface transformDataType {
  orderId: string;
  distributorId: string;
  name: string;
  status: string;
  products: {
    _id: string;
    productid: string;
    productName: string;
    productPrice: string;
    productDescription: string;
    productImage: string;
    quantity: string;
  }[];
}
export interface initialOrdersStateType {
  ordersData: OrderDataType[];
  currentOrder: DistributorOrderDataType | null;
  currentorderStatus: string;
  currentPage: number;
  selectedCategory: string;
  searchQuery: string;
  distributorData: DistributorType[];
  productsData: productType[];
  transFormedData: transformDataType[];
  modal: boolean;
}

export const initialOrdersState: initialOrdersStateType = {
  ordersData: [],
  currentOrder: null,
  currentorderStatus: "",
  currentPage: 1,
  selectedCategory: "Pending Orders",
  searchQuery: "",
  distributorData: [],
  productsData: [],
  transFormedData: [],
  modal: false,
};

export type ManufacturerOrdersAction =
  | {
      type: "SET_MANUFACTURERORDERS_DATA";
      payload: { ordersData: OrderDataType[] };
    }
  | {
      type: "SET_DISTRIBUTORS_DATA";
      payload: { distributorData: DistributorType[] };
    }
  | {
      type: "SET_PRODUCTS_DATA";
      payload: { productsData: productType[] };
    }
  | { type: "SET_SELECTED_CATEGORY"; payload: { selectedCategory: string } }
  | { type: "SET_SEARCH_QUERY"; payload: { searchQuery: string } }
  | {
      type: "SET_CURRENT_ORDER";
      payload: { currentOrder: DistributorOrderDataType };
    }
  | { type: "SET_CURRENT_PAGE"; payload: { currentPage: number } }
  | { type: "SET_MODAL"; payload: { modal: boolean } }
  | {
      type: "SET_TRANSFORMED_DATA";
      payload: { transFormedData: transformDataType[] };
    };

export const ManufacturerOrdersColumns = [
  { header: "DistributorName", accessor: "name" },
  { header: "Status", accessor: "status" },
  { header: "Approve", accessor: "approve" },
];

export const productColumns = [
  { header: "Name", accessor: "productName" },
  { header: "Description", accessor: "productDescription" },
  { header: "Price", accessor: "productPrice" },
  { header: "Image", accessor: "productImage" },
  { header: "Quantity", accessor: "quantity" },
];
