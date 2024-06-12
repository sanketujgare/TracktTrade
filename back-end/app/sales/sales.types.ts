import { z } from "zod";
import { IUserResponses } from "../users/user.types";

export const salesSchema = z.object({
    _id: z.string().optional(),
    distributorId: z.string(),
    customerName: z.string(),
    customerMobileNumber: z.string(),
    customerEmail: z.string(),
    products: z.array(
        z.object({
            productId: z.string(),
            quantity: z.number(),
            currentPrice: z.number(),
        })
    ),
    totalPrice: z.number(),
});

export interface ISalesSchema extends z.infer<typeof salesSchema> {}
export interface ISaleResponses extends IUserResponses {}
