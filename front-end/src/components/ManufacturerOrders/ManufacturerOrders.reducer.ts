import {
  ManufacturerOrdersAction,
  initialOrdersStateType,
} from "./ManufacturerOrders.types";

export const ManufacturerOrdersReducer = (
  state: initialOrdersStateType,
  action: ManufacturerOrdersAction
): initialOrdersStateType => {
  switch (action.type) {
    case "SET_MANUFACTURERORDERS_DATA":
      return {
        ...state,
        ordersData: action.payload.ordersData,
      };
    case "SET_DISTRIBUTORS_DATA":
      return {
        ...state,
        distributorData: action.payload.distributorData,
      };
    case "SET_PRODUCTS_DATA":
      return {
        ...state,
        productsData: action.payload.productsData,
      };
    case "SET_SELECTED_CATEGORY":
      return {
        ...state,
        selectedCategory: action.payload.selectedCategory,
      };
    case "SET_SEARCH_QUERY":
      return {
        ...state,
        searchQuery: action.payload.searchQuery,
      };
    case "SET_CURRENT_ORDER":
      return {
        ...state,
        currentOrder: action.payload.currentOrder,
      };
    case "SET_CURRENT_PAGE":
      return {
        ...state,
        currentPage: action.payload.currentPage,
      };
    default:
      return state;
  }
};
