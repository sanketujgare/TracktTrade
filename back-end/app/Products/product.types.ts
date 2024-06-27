import { z } from "zod";
import { IUserResponses } from "../users/user.types";

export const productSchema = z.object({
    productName: z.string().trim().min(1),
    productDescription: z.string().trim().min(1),
    productPrice: z.number().min(1),
    productImage: z.string().trim().min(10),
    createdBy: z.string().optional(),
    updatedBy: z.string().optional(),
    isDeleted: z.string().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
});

export const updatedFields = z.object({
    productName: z.string().trim().min(1).optional(),
    productDescription: z.string().trim().min(1).optional(),
    productPrice: z.number().min(1).optional(),
    productImage: z.string().trim().min(10).optional(),
    updatedBy: z.string().optional(),
    updatedAt: z.string().optional(),
});

export interface IUpdatedFields extends z.infer<typeof updatedFields> {}
export interface IProductSchema extends z.infer<typeof productSchema> {}
export interface IProductResponses extends IUserResponses {}

export const id = z.object({
    id: z.string(),
});
