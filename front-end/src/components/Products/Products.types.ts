export interface ProductsProps {}

export const columns = [
  { header: "Name", accessor: "productName" },
  { header: "Description", accessor: "productDescription" },
  { header: "Price", accessor: "productPrice" },
  { header: "Image", accessor: "productImage" },
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
  name: keyof productType;
  label: string;
  placeholder: string;
  type: "text" | "number" | "url";
  validation: ValidationOptions;
}

export type productType = {
  _id: string;
  productName: string;
  productPrice: number;
  productDescription: string;
  productImage: string;
};

export const ProductFormFields: Field[] = [
  {
    name: "productName",
    label: "Product Name",
    placeholder: "Enter product name",
    type: "text",
    validation: {
      required: true,
    },
  },
  {
    name: "productPrice",
    label: "Product Price",
    placeholder: "Enter product price",
    type: "number",
    validation: {
      required: true,
      valueAsNumber: true,
    },
  },
  {
    name: "productDescription",
    label: "Product Description",
    placeholder: "Enter product description",
    type: "text",
    validation: {
      required: true,
    },
  },
  {
    name: "productImage",
    label: "Product Image",
    placeholder: "Enter product image URL",
    type: "url",
    validation: {
      required: true,
      pattern: {
        value: /^(http|https):\/\/[^ "]+$/,
        message: "Product image must be a valid URL",
      },
    },
  },
];

export type InitialStateType = {
  data: productType[];
  modal: boolean;
  currentProduct: productType | {};
  productMode: "add" | "edit";
  selectedCategory: "All Products" | string;
  searchQuery: "";
  deleteModal: boolean;
  currentPage: number;
};

export type productAction =
  | { type: "SET_PRODUCTS_DATA"; payload: { data: productType[] } }
  | { type: "SET_MODAL"; payload: { modal: boolean } }
  | {
      type: "SET_CURRENT_PRODUCT";
      payload: { currentProduct: productType | {} };
    }
  | { type: "RESET_FORM" }
  | { type: "SET_SELECTED_CATEGORY"; payload: { selectedCategory: string } }
  | { type: "SET_SEARCH_QUERY"; payload: { searchQuery: string } }
  | { type: "SET_DELETE_MODAL"; payload: { deleteModal: boolean } }
  | { type: "SET_CURRENT_PAGE"; payload: { currentPage: number } };

export const InitialState: InitialStateType = {
  data: [],
  modal: false,
  currentProduct: {},
  productMode: "add",
  selectedCategory: "All Products",
  searchQuery: "",
  deleteModal: false,
  currentPage: 1,
};
