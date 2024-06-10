import { body } from "../utility/validator";
import { productSchema, updatedFields } from "./product.types";

export const productValidations = [body(productSchema)];
export const updateValidations = [body(updatedFields)];
