import { body } from "../utility/validator";
import { merchandiseSchema, redeemRequest } from "./merchandise.types";

export const merchandiseValidations = [body(merchandiseSchema)];
export const redeemRequestValidation = [body(redeemRequest)];
