import { Value } from "sass";

export interface ProductsProps {}

export const columns = [
  { header: "Name", accessor: "productName" },
  { header: "Description", accessor: "productDescription" },
  { header: "Price", accessor: "productPrice" },
  { header: "Image", accessor: "productImage" },
];

export const AddProductFormFields = [
  {
    name: "ProductName",
    label: "productName",
    placeholder: "Enter product name",
    type: "text",
    validation: {
      required: true,
    },
  },
  {
    name: "ProductPrice",
    label: "producPrice",
    placeholder: "Enter product price",
    type: "number",
    validation: {
      required: true,
    },
  },
  {
    name: "ProductDescription",
    label: "productDescription",
    placeholder: "Enter product Description",
    type: "text",
    validation: {
      required: true,
      maxLength: {
        value: 25,
        message: `The Description shouls less than 25 characters`,
      },
    },
  },
  {
    name: "ProductImage",
    label: "productImage",
    placeholder: "Enter product Image",
    type: "url",
    validation: {
      required: true,
    },
  },
];
