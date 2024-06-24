import { z } from "zod";
import { IUserResponses } from "../users/user.types";

export const orderSchema = z.object({
    distributorId: z.string(),
    products: z.array(
        z.object({
            productId: z.string(),
            quantity: z.number().min(1),
        })
    ),
    status: z.enum(["pending", "completed"]).optional(),
});

export interface IOrderSchema extends z.infer<typeof orderSchema> {}
export interface IOrderResponses extends IUserResponses {}

export const statusUpdate = z.object({
    status: z.enum(["pending", "completed"]),
});

export interface IStatusUpdate extends z.infer<typeof statusUpdate> {}

export const id = z.object({
    id: z.string(),
});
