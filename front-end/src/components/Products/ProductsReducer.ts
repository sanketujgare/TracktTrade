import { InitialStateType, productAction } from "./Products.types";

export const ProductsReducer = (
  state: InitialStateType,
  action: productAction
): InitialStateType => {
  switch (action.type) {
    case "SET_PRODUCTS_DATA":
      return { ...state, data: action.payload.data };

    case "SET_MODAL":
      return { ...state, modal: action.payload.modal };

    case "SET_CURRENT_PRODUCT":
      return {
        ...state,
        currentProduct: action.payload.currentProduct,
        productMode: "edit",
      };

    case "RESET_FORM":
      return { ...state, currentProduct: {}, productMode: "add" };

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
