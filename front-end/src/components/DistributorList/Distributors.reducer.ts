import { DistributorsAction, InitialStateType } from "./DistributorList.types";

export const DistributorsReducer = (
  state: InitialStateType,
  action: DistributorsAction
): InitialStateType => {
  switch (action.type) {
    case "SET_DISTRIBUTORS_DATA":
      return { ...state, data: action.payload.data };

    case "SET_MODAL":
      return { ...state, modal: action.payload.modal };

    case "SET_CURRENT_DISTRIBUTOR":
      return {
        ...state,
        currentDistributor: action.payload.currentDistributor,
        distributorMode: "edit",
      };

    case "RESET_FORM":
      return { ...state, currentDistributor: {}, distributorMode: "add" };

    case "SET_SELECTED_CATEGORY":
      return { ...state, selectedCategory: action.payload.selectedCategory };

    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload.searchQuery };

    case "SET_DELETE_MODAL":
      return { ...state, deleteModal: action.payload.deleteModal };

    default:
      return state;
  }
};
