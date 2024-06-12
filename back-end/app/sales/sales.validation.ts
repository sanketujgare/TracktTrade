import { body } from "../utility/validator";
import { salesSchema } from "./sales.types";

export const salesValidations = [body(salesSchema)];
