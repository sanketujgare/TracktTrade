import Button from "../Button/Button";
import { productType } from "../Products/Products.types";

export interface ManufacturerInventoryProps {}

export interface ManufacturerInventoryType {
  product: productType;
  quantity: number;
}

export const ManufacturerInventoryColumns = [
  //   { header: "Select", accessor: "select" },
  { header: "Name", accessor: "productName" },
  { header: "Description", accessor: "productDescription" },
  { header: "Price", accessor: "productPrice" },
  { header: "Image", accessor: "productImage" },
  { header: "Quantity", accessor: "quantity" },
  { header: "Update", accessor: "updateButtons" },
];

export interface InitialStateType {
  manufacturerInventoryData: ManufacturerInventoryType[];
  modal: boolean;
  selectedCategory: "All Products" | string;
  searchQuery: string;
  selectedItems: ManufacturerInventoryType[];
  currentPage: number;
}

export const InitialState: InitialStateType = {
  manufacturerInventoryData: [],
  modal: false,
  selectedCategory: "All Products",
  searchQuery: "",
  selectedItems: [],
  currentPage: 1,
};

export type ManufacturerInventoryAction =
  | {
      type: "SET_INVENTORY_DATA";
      payload: { manufacturerInventoryData: ManufacturerInventoryType[] };
    }
  | { type: "SET_MODAL"; payload: { modal: boolean } }
  | { type: "RESET_FORM" }
  | { type: "SET_SELECTED_CATEGORY"; payload: { selectedCategory: string } }
  | { type: "SET_SEARCH_QUERY"; payload: { searchQuery: string } }
  | {
      type: "SET_SELECTED_ITEMS";
      payload: { selectedItems: any[] };
    }
  | { type: "SET_CURRENT_PAGE"; payload: { currentPage: number } };

export const flattenObj = (ob: ManufacturerInventoryType) => {
  let result = {};
  for (const i in ob) {
    if (typeof ob[i] === "object" && !Array.isArray(ob[i])) {
      const temp = flattenObj(ob[i]);
      for (const j in temp) {
        result[j] = temp[j];
      }
    } else {
      result[i] = ob[i];
    }
  }
  return result;
};

export const flattenArrayOfObjects = (
  data: ManufacturerInventoryType[] | []
) => {
  console.log(data);
  if (!Array.isArray(data)) {
    return [];
  }
  const newData = data.map((obj) => flattenObj(obj));
  if (newData.length === 0) {
    return [];
  } else {
    return newData;
  }
};

export const dummyData: ManufacturerInventoryType[] = [
  {
    product: {
      _id: "1",
      productName: "Product A",
      productDescription: "Description for Product A",
      productPrice: 100,
      productImage: "https://via.placeholder.com/150",
    },
    quantity: 10,
  },
  {
    product: {
      _id: "2",
      productName: "Product B",
      productDescription: "Description for Product B",
      productPrice: 150,
      productImage: "https://via.placeholder.com/150",
    },
    quantity: 5,
  },
  {
    product: {
      _id: "3",
      productName: "Product C",
      productDescription: "Description for Product C",
      productPrice: 200,
      productImage: "https://via.placeholder.com/150",
    },
    quantity: 20,
  },
  {
    product: {
      _id: "4",
      productName: "Product D",
      productDescription: "Description for Product D",
      productPrice: 250,
      productImage: "https://via.placeholder.com/150",
    },
    quantity: 7,
  },
  {
    product: {
      _id: "5",
      productName: "Product E",
      productDescription: "Description for Product E",
      productPrice: 300,
      productImage: "https://via.placeholder.com/150",
    },
    quantity: 12,
  },
];
