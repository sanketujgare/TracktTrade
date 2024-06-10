import { credentials, userSchema } from "../users/user.types";
import { body } from "../utility/validator";

export const loginValidations = [body(credentials)];
export const signupValidations = [body(userSchema)];
