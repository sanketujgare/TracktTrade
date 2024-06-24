import { body } from "../utility/validator";
import { orderSchema, statusUpdate } from "./orders.types";

export const orderValidations = [body(orderSchema)];
export const UpdateOrderValidations = [body(statusUpdate)];
