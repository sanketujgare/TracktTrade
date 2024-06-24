import { z } from "zod";
import { IUserResponses } from "../users/user.types";
export const merchandiseSchema = z.object({
    merchandiseName: z.string(),
    merchandiseDescription: z.string(),
    pointsRequired: z.number(),
    merchandiseImage: z.string(),
    createdBy: z.string().optional(),
    updatedBy: z.string().optional(),
    isDeleted: z.string().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
});

export interface IMerchandiseSchema extends z.infer<typeof merchandiseSchema> {}
export interface IMerchandiseResponses extends IUserResponses {}

export const redeemedSchema = z.object({
    merchandiseId: z.string(),
    status: z.enum(["pending", "completed"]).optional(),
    createdAt: z.date().optional(),
});
export interface IRedeemedSchema extends z.infer<typeof redeemedSchema> {}

export const redeemRequest = z.object({
    merchandiseId: z.string(),
    userId: z.string(),
});
export interface IRedeemeRequest extends z.infer<typeof redeemRequest> {}
