export interface ManufacturerMerchandiseProps {}

export const Merchandisecolumns = [
  { header: "Name", accessor: "merchandiseName" },
  { header: "Description", accessor: "merchandiseDescription" },
  { header: "Points", accessor: "pointsRequired" },
  { header: "Image", accessor: "merchandiseImage" },
  { header: "Buttons", accessor: "editDeleteBtns" },
];

export interface MerchandiseType {
  _id: string;
  merchandiseName: string;
  merchandiseDescription: string;
  pointsRequired: number;
  merchandiseImage: string;
}

export type InitialStateType = {
  merchandiseData: MerchandiseType[];
  modal: boolean;
  currentMerchandise: MerchandiseType | {};
  merchandiseMode: "add" | "edit";
  selectedCategory: string;
  searchQuery: string;
  deleteModal: boolean;
  currentPage: number;
};

export type MerchandiseAction =
  | { type: "SET_MERCHANDISE_DATA"; payload: { data: MerchandiseType[] } }
  | { type: "SET_MODAL"; payload: { modal: boolean } }
  | {
      type: "SET_CURRENT_MERCHANDISE";
      payload: { currentMerchandise: MerchandiseType | {} };
    }
  | { type: "RESET_FORM" }
  | { type: "SET_SELECTED_CATEGORY"; payload: { selectedCategory: string } }
  | { type: "SET_SEARCH_QUERY"; payload: { searchQuery: string } }
  | { type: "SET_DELETE_MODAL"; payload: { deleteModal: boolean } }
  | { type: "SET_CURRENT_PAGE"; payload: { currentPage: number } };

export const InitialState: InitialStateType = {
  merchandiseData: [],
  modal: false,
  currentMerchandise: {},
  merchandiseMode: "add",
  selectedCategory: "All Products",
  searchQuery: "",
  deleteModal: false,
  currentPage: 1,
};

type ValidationOptions = {
  required: boolean;
  pattern?: {
    value: RegExp;
    message: string;
  };
  valueAsNumber?: boolean;
};

export interface MerchandiseField {
  name: keyof MerchandiseType;
  label: string;
  placeholder: string;
  type: "text" | "number" | "url";
  validation: ValidationOptions;
}
export const MerchandiseFormFields: MerchandiseField[] = [
  {
    name: "merchandiseName",
    label: "Merchandise  Name",
    placeholder: "Enter Merchandise name",
    type: "text",
    validation: {
      required: true,
    },
  },
  {
    name: "pointsRequired",
    label: "Merchandise Price",
    placeholder: "Enter Merchandise points",
    type: "number",
    validation: {
      required: true,
      valueAsNumber: true,
    },
  },
  {
    name: "merchandiseDescription",
    label: "Merchandise Description",
    placeholder: "Enter Merchandise description",
    type: "text",
    validation: {
      required: true,
    },
  },
  {
    name: "merchandiseImage",
    label: "Merchandise Image",
    placeholder: "Enter Merchandise image URL",
    type: "url",
    validation: {
      required: true,
      pattern: {
        value: /^(http|https):\/\/[^ "]+$/,
        message: "Merchandise image must be a valid URL",
      },
    },
  },
];
