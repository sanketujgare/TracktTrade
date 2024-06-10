import { z } from "zod";

export const salesSchema = z.object({
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
