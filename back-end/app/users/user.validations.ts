import { body, params } from "../utility/validator";
import {
    id,
    userSchema,
    userUpdateSchema,
} from "./user.types";

export const createValidations = [body(userSchema)];
export const updateValidations = [
    params(id),
    body(userUpdateSchema),
];

export const getAndDeleteValidations = [params(id)];
