// export const CustomerSalesreducer = (state: State, action: Action): State => {
//   switch (action.type) {
//     case "SET_CUSTOMER_DETAIL":
//       return {
//         ...state,
//         customerdata: { ...state.customerdata, [action.field]: action.value },
//       };
//     case "ADD_ITEM":
//       return { ...state, selectedItems: [...state.selectedItems, action.item] };
//     case "REMOVE_ITEM":
//       return {
//         ...state,
//         selectedItems: state.selectedItems.filter(
//           (item) => item.productId !== action.productId
//         ),
//       };
//     case "UPDATE_ITEM_QUANTITY":
//       return {
//         ...state,
//         selectedItems: state.selectedItems.map((item) =>
//           item.productId === action.productId
//             ? { ...item, quantity: action.quantity }
//             : item
//         ),
//       };
//     case "SET_SEARCH_QUERY":
//       return { ...state, searchQuery: action.query };
//     case "SET_SUGGESTIONS":
//       return { ...state, suggestions: action.suggestions };
//     case "RESET_FORM":
//       return initialState;
//     case "SET_CUSTOMER_DATA":
//       return { ...state, customerdata: action.payload };
//     case "SET_INVENTORY_DATA":
//       return {
//         ...state,
//         distributorInventoryData: action.payload.distributorInventoryData,
//       };
//     default:
//       return state;
//   }
// };

import { Reducer } from "react";
import {
  initialState,
  CustomerSalesState,
  CustomerSalesAction,
} from "./CustomerSales.types";

const CustomerSalesReducer: Reducer<CustomerSalesState, CustomerSalesAction> = (
  state,
  action
) => {
  switch (action.type) {
    case "SET_INVENTORY_DATA":
      return {
        ...state,
        distributorInventoryData: action.payload.distributorInventoryData,
      };
    case "SET_SEARCH_QUERY":
      return {
        ...state,
        searchQuery: action.query,
      };
    case "SET_SUGGESTIONS":
      return {
        ...state,
        suggestions: action.suggestions,
      };
    case "ADD_ITEM":
      return {
        ...state,
        selectedItems: [...state.selectedItems, action.item],
      };
    case "UPDATE_ITEM_QUANTITY":
      return {
        ...state,
        selectedItems: state.selectedItems.map((item) =>
          item.productId === action.productId
            ? { ...item, quantity: action.quantity }
            : item
        ),
      };
    case "UPDATE_ITEM_PRICE":
      return {
        ...state,
        selectedItems: state.selectedItems.map((item) =>
          item.productId === action.productId
            ? { ...item, currentPrice: action.currentPrice }
            : item
        ),
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        selectedItems: state.selectedItems.filter(
          (item) => item.productId !== action.productId
        ),
      };
    case "SET_CUSTOMER_DETAIL":
      return {
        ...state,
        customerData: {
          ...state.customerData,
          [action.field]: action.value,
        },
      };
    case "RESET_FORM":
      return initialState; // Reset to initial state
    default:
      return state;
  }
};

export default CustomerSalesReducer;
