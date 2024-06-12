import { body } from "../utility/validator";
import { userSchema } from "./user.types";

export const createValidations = [body(userSchema)];
