import { z } from "zod";
export interface IUserResponses {
    [key: string]: {
        statusCode: number;
        message: string;
    };
}

export const userSchema = z.object({
    name: z.string(),
    username: z.string(),
    password: z.string(),
    role: z.enum(["Manufacturer", "Distributor", "Customer"]),
    mobileNumber: z.string(),
    email: z.string(),
    points: z.number().optional(),
    inventory: z
        .array(
            z.object({
                productId: z.string(),
                quantity: z.number(),
            })
        )
        .optional(),
    distributorSales: z
        .array(
            z.object({
                salesId: z.string(),
            })
        )
        .optional(),
    customerPurchaceHistory: z
        .array(
            z.object({
                salesId: z.string(),
            })
        )
        .optional(),
    rewardsRedeemed: z
        .array(
            z.object({
                rewardId: z.string(),
            })
        )
        .optional(),
});

export const credentials = userSchema.pick({ username: true, password: true });
export interface ICredentials extends z.infer<typeof credentials> {}
export const recordsPerPage = 5;
export interface IUserSchema extends z.infer<typeof userSchema> {}

export const customerSchema = z.object({
    name: z.string(),
    mobileNumber: z.string(),
    email: z.string(),
    salesId: z.string().optional(),
    role: z.string().optional(),
});

export interface ICustomerSchema extends z.infer<typeof customerSchema> {}
