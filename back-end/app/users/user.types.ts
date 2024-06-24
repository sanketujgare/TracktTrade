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
    role: z.enum(["Manufacturer", "Distributor"]),
    mobileNumber: z.string(),
    email: z.string(),

    pointsEarned: z
        .array(
            z.object({
                points: z.number(),
                createdAt: z.date().optional(),
            })
        )
        .optional(),
    totalPoints: z.number().optional(),

    inventory: z
        .array(
            z.object({
                productId: z.string(),
                quantity: z.number(),
            })
        )
        .optional(),

    merchandiseRedeemed: z
        .array(
            z.object({
                merchandiseId: z.string(),
                status: z.enum(["pending", "completed"]).optional(),
                createdAt: z.date().optional(),
            })
        )
        .optional(),
    createdBy: z.string().optional(),
    updatedBy: z.string().optional(),
});

export const credentials = userSchema.pick({ username: true, password: true });
export interface ICredentials extends z.infer<typeof credentials> {}
export interface IUserSchema extends z.infer<typeof userSchema> {}

export const userUpdateSchema = z.object({
    name: z.string().optional(),
    username: z.string().optional(),
    mobileNumber: z.string().optional(),
    email: z.string().optional(),
    updatedBy: z.string().optional(),
    // totalPoints: z.number().optional(),
});

export interface IUserUpdateSchema extends z.infer<typeof userUpdateSchema> {
    totalPoints: number;
}

export const pointsEarnedSchema = z.object({
    points: z.number(),
    createdAt: z.date().optional(),
});
export interface IPointsEarnedSchema
    extends z.infer<typeof pointsEarnedSchema> {}

export const id = z.object({
    id: z.string(),
});
