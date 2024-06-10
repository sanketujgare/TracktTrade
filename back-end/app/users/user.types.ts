import { Schema, string } from "zod";
import { z } from "zod";
export interface IUserResponses {
  [key: string]: {
    statusCode: number;
    message: string;
  };
}

export const userSchema = z.object({
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
