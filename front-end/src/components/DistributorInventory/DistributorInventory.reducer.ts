import {
  InitialStateType,
  DistributorInventoryAction,
} from "./DistributorInventory.types";

export const distributorInventoryReducer = (
  state: InitialStateType,
  action: DistributorInventoryAction
) => {
  switch (action.type) {
    case "SET_INVENTORY_DATA":
      return {
        ...state,
        distributorInventoryData: action.payload.distributorInventoryData,
      };
    case "SET_MODAL":
      return {
        ...state,
        modal: action.payload.modal,
      };
    case "RESET_FORM":
      return {
        ...state,
        modal: false,
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
    case "SET_SELECTED_ITEMS":
      return {
        ...state,
        selectedItems: action.payload.selectedItems,
      };
    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload.currentPage };

    default:
      return state;
  }
};
