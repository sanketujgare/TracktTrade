import { body } from "../utility/validator";
import { merchandiseSchema } from "./merchandise.types";

export const merchandiseValidations = [body(merchandiseSchema)];
