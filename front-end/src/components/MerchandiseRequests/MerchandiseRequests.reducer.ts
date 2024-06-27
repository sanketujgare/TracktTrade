import { initialRequestsState } from "./MerchandiseRequests.types.ts";

export const MerchandiseRequestsReducer = (state, action) => {
  switch (action.type) {
    case "SET_REQUESTS_DATA":
      return { ...state, requestsData: action.payload.requestsData };
    case "SET_CURRENT_REQUEST":
      return { ...state, currentRequest: action.payload.currentRequest };
    case "SET_MODAL":
      return { ...state, modal: action.payload.modal };
    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload.cuurentPage };
    default:
      return state;
  }
};
