import {
  InitialStateType,
  MerchandiseAction,
} from "./ManufacturerMerchandise.types";

export const merchandiseReducer = (
  state: InitialStateType,
  action: MerchandiseAction
): InitialStateType => {
  switch (action.type) {
    case "SET_MERCHANDISE_DATA":
      return { ...state, merchandiseData: action.payload.data };

    case "SET_MODAL":
      return { ...state, modal: action.payload.modal };

    case "SET_CURRENT_MERCHANDISE":
      return {
        ...state,
        currentMerchandise: action.payload.currentMerchandise,
        merchandiseMode: "edit",
      };

    case "RESET_FORM":
      return { ...state, currentMerchandise: {}, merchandiseMode: "add" };

    case "SET_SELECTED_CATEGORY":
      return { ...state, selectedCategory: action.payload.selectedCategory };

    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload.searchQuery };

    case "SET_DELETE_MODAL":
      return { ...state, deleteModal: action.payload.deleteModal };
    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload.currentPage };

    default:
      return state;
  }
};
