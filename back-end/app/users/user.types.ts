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

    pointsEarned: z.array(
        z.object({
            points: z.number(),
            createdAt: z.date(),
        })
    ),
    totalPoints: z.number().optional(),

    inventory: z
        .array(
            z.object({
                productId: z.string(),
                quantity: z.number(),
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
export interface IUserSchema extends z.infer<typeof userSchema> {}

export const UserUpdateSchema = z.object({
    name: z.string(),
    username: z.string(),
    mobileNumber: z.string(),
    email: z.string(),
});

export interface IUserUpdateSchema extends z.infer<typeof UserUpdateSchema> {}
