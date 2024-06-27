import { body, params } from "../utility/validator";
import {
    id,
    merchandiseSchema,
    redeemRequest,
    udpateRequestSchema,
} from "./merchandise.types";

export const merchandiseValidations = [body(merchandiseSchema)];
export const redeemRequestValidation = [body(redeemRequest)];
export const approveValidations = [body(udpateRequestSchema)];
export const deleteAndUpdateValidation = [params(id)];
