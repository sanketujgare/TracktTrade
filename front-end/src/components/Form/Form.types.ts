import { FieldValues, SubmitHandler } from "react-hook-form";
import { ZodType } from "zod";

export interface LoginInputType {
  username: string;
  password: string;
}
export interface productInputType {
  productName: string;
  productImage: string;
  productPrice: number;
  productDescription: string;
}

type FieldType = {
  name: string;
  label?: string;
  placeholder: string;
  type?: string;
  validation?: Record<string, unknown>;
};

export interface FormProps {
  fields: FieldType[];
  submitData: (data: LoginInputType | productInputType) => void;
  SubmitButtontext: string;
}
