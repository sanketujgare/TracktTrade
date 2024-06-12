"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUpdateSchema = exports.credentials = exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    name: zod_1.z.string(),
    username: zod_1.z.string(),
    password: zod_1.z.string(),
    role: zod_1.z.enum(["Manufacturer", "Distributor"]),
    mobileNumber: zod_1.z.string(),
    email: zod_1.z.string(),
    pointsEarned: zod_1.z.array(zod_1.z.object({
        points: zod_1.z.number(),
        createdAt: zod_1.z.date(),
    })),
    totalPoints: zod_1.z.number().optional(),
    inventory: zod_1.z
        .array(zod_1.z.object({
        productId: zod_1.z.string(),
        quantity: zod_1.z.number(),
    }))
        .optional(),
    rewardsRedeemed: zod_1.z
        .array(zod_1.z.object({
        rewardId: zod_1.z.string(),
    }))
        .optional(),
});
exports.credentials = exports.userSchema.pick({ username: true, password: true });
exports.UserUpdateSchema = zod_1.z.object({
    name: zod_1.z.string(),
    username: zod_1.z.string(),
    mobileNumber: zod_1.z.string(),
    email: zod_1.z.string(),
});
