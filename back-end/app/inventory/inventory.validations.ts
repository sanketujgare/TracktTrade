import { body } from "../utility/validator";
import { inventorySchema, inventoryUpdates } from "./inventory.types";

export const inventoryValidations = [body(inventoryUpdates)];
