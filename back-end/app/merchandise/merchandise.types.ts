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
