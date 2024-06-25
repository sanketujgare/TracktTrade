export interface ManufacturerCustomersProps {}

export interface CustomerType {
  customerName: string;
  customerMobileNumber: string;
  customerEmail: string;
}

export const Customercolumns = [
  { header: "Name", accessor: "customerName" },
  { header: "MobileNumber", accessor: "customerMobileNumber" },
  { header: "Email", accessor: "customerEmail" },
  { header: "View", accessor: "ViewButtons" },
];

export type ManufacturerCustomersAction =
  | {
      type: "SET_MANUFACTURERCUSTOMERS_DATA";
      payload: { customerdata: CustomerType[] };
    }
  | { type: "SET_MODAL"; payload: { modal: boolean } }
  | {
      type: "SET_CURRENT_MANUFACTURERCUSTOMER";
      payload: { currentManufacturer: CustomerType | {} };
    }
  | { type: "RESET_FORM" }
  | { type: "SET_SELECTED_CATEGORY"; payload: { selectedCategory: string } }
  | { type: "SET_SEARCH_QUERY"; payload: { searchQuery: string } };

export type InitialStateType = {
  customerdata: CustomerType[];
  modal: boolean;
  currentManufacturer: CustomerType | {};
  selectedCategory: "All Distributors" | string;
  searchQuery: string;
};

export const InitialState: InitialStateType = {
  customerdata: [],
  modal: false,
  currentManufacturer: {},
  selectedCategory: "All Products",
  searchQuery: "",
};

export const customerData: CustomerType[] = [
  {
    customerName: "Jay Singh",
    customerMobileNumber: "7865353372",
    customerEmail: "jay.singh@gmail.com",
  },
];
