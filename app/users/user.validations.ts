import { body, params } from "../utility/validator";
import { assignMeterSchema, boardId, userSchema } from "./user.types";

export const userValidations = [body(userSchema)];
export const getUsersValidations = [params(boardId)];
export const assignMeterValidations = [body(assignMeterSchema)];
