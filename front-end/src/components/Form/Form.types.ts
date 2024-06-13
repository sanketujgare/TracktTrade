import { FieldValues, SubmitHandler } from "react-hook-form";

export interface LoginInputType {
  username: string;
  password: string;
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
  onSubmit: SubmitHandler<FieldValues>;
  SubmitButtontext: string;
}
