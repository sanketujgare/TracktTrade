import { body, params } from "../utility/validator";
import { id, productSchema, updatedFields } from "./product.types";

export const productValidations = [body(productSchema)];
export const updateValidations = [params(id), body(updatedFields)];

export const getAndDeleteValidations = [params(id)];
