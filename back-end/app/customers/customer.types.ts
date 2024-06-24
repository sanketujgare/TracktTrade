import { IUserResponses } from "../users/user.types";
import { z } from "zod";
import { findByMobileNumber } from "./customer.repo";
export interface ICustomerResponses extends IUserResponses {}

export const customerSchema = z.object({
    name: z.string(),
    mobileNumber: z.string(),
    email: z.string(),
    purchaseHistory: z.array(
        z.object({
            salesId: z.string(),
            createdAt: z.date().optional(),
        })
    ),
});

export interface ICustomerSchema extends z.infer<typeof customerSchema> {}

export const purchaseHistorySchema = z.object({ salesId: z.string() });
export interface IPurchaseSchema
    extends z.infer<typeof purchaseHistorySchema> {}

export const mobileNumber = z.object({
    mobilenumber: z.string(),
});
