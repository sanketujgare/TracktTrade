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
    totalPrice: z.number().optional(),
});

export interface ISalesSchema extends z.infer<typeof salesSchema> {}
export interface ISaleResponses extends IUserResponses {}

export const dateRangeSchema = z.object({
    startdate: z.string(),
    enddate: z.string(),
    distributorId: z.string().optional(),
});
export interface IDateRangeSchema extends z.infer<typeof dateRangeSchema> {}
