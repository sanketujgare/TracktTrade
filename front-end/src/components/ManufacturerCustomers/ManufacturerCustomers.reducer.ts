import {
  InitialStateType,
  ManufacturerCustomersAction,
} from "./ManufacturerCustomers.types";

export const ManufacturerCustomersReducer = (
  state: InitialStateType,
  action: ManufacturerCustomersAction
): InitialStateType => {
  switch (action.type) {
    case "SET_MANUFACTURERCUSTOMERS_DATA":
      return { ...state, customerdata: action.payload.customerdata };

    case "SET_MODAL":
      return { ...state, modal: action.payload.modal };

    case "SET_CURRENT_MANUFACTURERCUSTOMER":
      return {
        ...state,
        currentManufacturer: action.payload.currentManufacturer,
      };

    case "RESET_FORM":
      return { ...state, currentManufacturer: {} };

    case "SET_SELECTED_CATEGORY":
      return { ...state, selectedCategory: action.payload.selectedCategory };

    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload.searchQuery };

    default:
      return state;
  }
};
