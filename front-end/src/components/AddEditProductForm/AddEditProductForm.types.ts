import { ZodType, z } from "zod";
import { productInputType } from "../Form/Form.types";
import { productAction, productType } from "../Products/Products.types";

export interface AddEditProductFormProps {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  dispatch: React.Dispatch<productAction>;
  currentProduct: productType | {};
  handleEdit?: (row: productType) => void;
  productMode: "add" | "edit" | "delete" | "reset";
}

export interface AddEditProductFields {
  productName: string;
  productImage: string;
  productDescription: string;
  productPrice: number;
}

// export const productSchema: ZodType<productInputType> = z.object({
//   productName: z.string(),
//   productDescription: z.string(),
//   productPrice: z.number(),
//   productImage: z.string(),
// });

export const productSchema = z.object({
  productName: z.string().min(1, { message: "Product name is required" }),
  productDescription: z.string(),
  productPrice: z.number(),
  productImage: z.string().url("Invalid URL format"),
});

export type ProductSchemaType = z.infer<typeof productSchema>;
