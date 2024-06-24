import { z } from "zod";
import { IUserResponses } from "../users/user.types";

export const inventorySchema = z.object({
    productId: z.string(),
    quantity: z.number().positive(),
});
export interface IInventoryResponses extends IUserResponses {}
export interface IInventorySchema extends z.infer<typeof inventorySchema> {}
