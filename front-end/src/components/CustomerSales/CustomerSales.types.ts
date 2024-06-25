import { DistributorInventoryType } from "../DistributorInventory/DistributorInventory.types";

// export interface CustomerSalesProps {
//   inventoryItems: Array<{
//     _id: string;
//     productName: string;
//     quantity: number;
//   }>;
//   handleSell: (saleData: SaleData) => void;
// }

// export interface CustomerType {
//   customerName: string;
//   customerMobileNumber: string;
//   customerEmail: string;
// }
// export interface SaleProduct {
//   productId: string;
//   productName: string;
//   quantity: number;
//   currentPrice: number;
// }
// export interface SaleData {
//   distributorId: string;
//   customerName: string;
//   customerMobileNumber: string;
//   customerEmail: string;
//   products: SaleProduct[];
// }

// export const initialState = {
//   customerdata: {
//     customerName: "",
//     customerMobileNumber: "",
//     customerEmail: "",
//   },
//   selectedItems: [],
//   searchQuery: "",
//   distributorInventoryData: [],
//   suggestions: [],
// };

// export interface initialStateType {
//   customerdata: CustomerType;
//   selectedItems: SaleProduct[];
//   searchQuery: "";
//   distributorInventoryData: DistributorInventoryType[];
//   suggestions: any[];
// }
// export type Action =
//   | { type: "SET_CUSTOMER_DETAIL"; field: string; value: string }
//   | {
//       type: "ADD_ITEM";
//       item: { productId: string; productName: string; quantity: number };
//     }
//   | { type: "REMOVE_ITEM"; productId: string }
//   | { type: "UPDATE_ITEM_QUANTITY"; productId: string; quantity: number }
//   | { type: "SET_SEARCH_QUERY"; query: string }
//   | {
//       type: "SET_SUGGESTIONS";
//       suggestions: Array<{ _id: string; productName: string }>;
//     }
//   | { type: "RESET_FORM" }
//   | { type: "SET_CUSTOMER_DATA"; payload: CustomerType }
//   | {
//       type: "SET_INVENTORY_DATA";
//       payload: { distributorInventoryData: DistributorInventoryType[] };
//     };
export interface SaleProduct {
  productId: string;
  productName: string;
  quantity: number;
  currentPrice: number; // Assuming currentPrice is a number
}

export interface CustomerType {
  customerName: string;
  customerMobileNumber: string;
  customerEmail: string;
}

// export interface DistributorInventoryType {
//   _id: string;
//   productName: string;
//   // Add other properties as needed
// }

export interface CustomerSalesState {
  searchQuery: string;
  customerData: CustomerType;
  selectedItems: SaleProduct[];
  distributorInventoryData: DistributorInventoryType[];
  suggestions: DistributorInventoryType[]; // Assuming suggestions are of the same type as distributorInventoryData
}

export interface CustomerSalesProps {
  // Define props if any
}

export interface SaleData {
  customerdata: CustomerType;
  items: SaleProduct[];
}

export const initialState: CustomerSalesState = {
  searchQuery: "",
  customerData: {
    customerName: "",
    customerMobileNumber: "",
    customerEmail: "",
  },
  selectedItems: [],
  distributorInventoryData: [],
  suggestions: [],
};

export type CustomerSalesAction =
  | {
      type: "SET_INVENTORY_DATA";
      payload: { distributorInventoryData: DistributorInventoryType[] };
    }
  | { type: "SET_SEARCH_QUERY"; query: string }
  | { type: "SET_SUGGESTIONS"; suggestions: DistributorInventoryType[] }
  | { type: "ADD_ITEM"; item: SaleProduct }
  | { type: "UPDATE_ITEM_QUANTITY"; productId: string; quantity: number }
  | { type: "UPDATE_ITEM_PRICE"; productId: string; currentPrice: number }
  | { type: "REMOVE_ITEM"; productId: string }
  | { type: "SET_CUSTOMER_DETAIL"; field: keyof CustomerType; value: string }
  | { type: "RESET_FORM" };
