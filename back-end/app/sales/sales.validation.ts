import { body, query } from "../utility/validator";
import { dateRangeSchema, salesSchema } from "./sales.types";

export const salesValidations = [body(salesSchema)];
export const dateRangeValidations = [query(dateRangeSchema)];
