import {
  InitialStateType,
  ManufacturerInventoryAction,
} from "./ManufacturerInventory.types";

export const ManufacturerInventoryReducer = (
  state: InitialStateType,
  action: ManufacturerInventoryAction
) => {
  switch (action.type) {
    case "SET_INVENTORY_DATA":
      return {
        ...state,
        manufacturerInventoryData: action.payload.manufacturerInventoryData,
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
