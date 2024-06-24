import { body } from "../utility/validator";
import { inventorySchema } from "./inventory.types";

export const inventoryValidations = [body(inventorySchema)];
