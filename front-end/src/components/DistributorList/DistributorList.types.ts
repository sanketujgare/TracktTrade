import { productType } from "../Products/Products.types";

export interface DistributorListProps {}

export interface DistributorType {
  _id?: string;
  username: string;
  email: string;
  password: string;
  name: string;
  role: string;
  mobileNumber: string;
  totalPoints: number;
}

export const columns = [
  { header: "Name", accessor: "name" },
  { header: "MobileNumber", accessor: "mobileNumber" },
  { header: "totalPoints", accessor: "totalPoints" },
  { header: "Buttons", accessor: "editDeleteBtns" },
];

type ValidationOptions = {
  required: boolean;
  pattern?: {
    value: RegExp;
    message: string;
  };
  valueAsNumber?: boolean;
};

export interface Field {
  name: keyof DistributorType;
  label: string;
  placeholder: string;
  type: "text" | "number" | "email";
  validation: ValidationOptions;
}

export const DistributorFormFields: Field[] = [
  {
    name: "name",
    label: "Distributor Name",
    placeholder: "Enter Distributor name",
    type: "text",
    validation: {
      required: true,
    },
  },
  {
    name: "username",
    label: "Username",
    placeholder: "Enter Distributor username",
    type: "text",
    validation: {
      required: true,
    },
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter Distributor email",
    type: "email",
    validation: {
      required: true,
    },
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter Distributor Password",
    type: "text",
    validation: {
      required: true,
    },
  },
  {
    name: "role",
    label: "Role",
    placeholder: "Enter Distributor Role",
    type: "text",
    validation: {
      required: true,
    },
    value: "Distributor",
  },
  {
    name: "mobileNumber",
    label: "Mobile No",
    placeholder: "Enter Mobile No",
    type: "text",
    validation: {
      required: true,
    },
  },
];

export type InitialStateType = {
  data: DistributorType[];
  modal: boolean;
  currentDistributor: DistributorType | {};
  distributorMode: "add" | "edit";
  selectedCategory: "All Distributors" | string;
  searchQuery: string;
  deleteModal: boolean;
};

export type DistributorsAction =
  | { type: "SET_DISTRIBUTORS_DATA"; payload: { data: DistributorType[] } }
  | { type: "SET_MODAL"; payload: { modal: boolean } }
  | {
      type: "SET_CURRENT_DISTRIBUTOR";
      payload: { currentDistributor: DistributorType | {} };
    }
  | { type: "RESET_FORM" }
  | { type: "SET_SELECTED_CATEGORY"; payload: { selectedCategory: string } }
  | { type: "SET_SEARCH_QUERY"; payload: { searchQuery: string } }
  | { type: "SET_DELETE_MODAL"; payload: { deleteModal: boolean } };

type RowType = productType | DistributorType;

export const distributors: DistributorType[] = [
  {
    _id: "62f8dff1d1b2b2e8dcd1f1e3",
    username: "john_doe",
    password: "password123",
    email: "abc@gmail.com",
    name: "John Doe",
    role: "Distributor",
    mobileNumber: "123-456-7890",
    totalPoints: 1500,
  },
  {
    _id: "62f8e0a2d1b2b2e8dcd1f1e4",
    username: "jane_smith",
    password: "securepass456",
    email: "def@gmail.com",
    name: "Jane Smith",
    role: "Distributor",
    mobileNumber: "098-765-4321",
    totalPoints: 3000,
  },
  {
    _id: "62f8e0c4d1b2b2e8dcd1f1e5",
    username: "alice_wonder",
    password: "wonderland789",
    email: "ghi@gmail.com",
    name: "Alice Wonder",
    role: "Distributor",
    mobileNumber: "456-789-0123",
    totalPoints: 2500,
  },
  {
    _id: "62f8e0e6d1b2b2e8dcd1f1e6",
    username: "bob_builder",
    password: "builder456",
    email: "jkl@gmail.com",
    name: "Bob Builder",
    role: "Distributor",
    mobileNumber: "321-654-0987",
    totalPoints: 2000,
  },
  {
    _id: "62f8e108d1b2b2e8dcd1f1e7",
    username: "charlie_chaplin",
    password: "funnybone123",
    email: "lmn@gmail.com",
    name: "Charlie Chaplin",
    role: "Distributor",
    mobileNumber: "789-012-3456",
    totalPoints: 1000,
  },
];
