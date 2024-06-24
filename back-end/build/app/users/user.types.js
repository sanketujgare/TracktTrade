"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.id = exports.pointsEarnedSchema = exports.userUpdateSchema = exports.credentials = exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    name: zod_1.z.string(),
    username: zod_1.z.string(),
    password: zod_1.z.string(),
    role: zod_1.z.enum(["Manufacturer", "Distributor"]),
    mobileNumber: zod_1.z.string(),
    email: zod_1.z.string(),
    pointsEarned: zod_1.z
        .array(zod_1.z.object({
        points: zod_1.z.number(),
        createdAt: zod_1.z.date().optional(),
    }))
        .optional(),
    totalPoints: zod_1.z.number().optional(),
    inventory: zod_1.z
        .array(zod_1.z.object({
        productId: zod_1.z.string(),
        quantity: zod_1.z.number(),
    }))
        .optional(),
    merchandiseRedeemed: zod_1.z
        .array(zod_1.z.object({
        merchandiseId: zod_1.z.string(),
        status: zod_1.z.enum(["pending", "completed"]).optional(),
        createdAt: zod_1.z.date().optional(),
    }))
        .optional(),
    createdBy: zod_1.z.string().optional(),
    updatedBy: zod_1.z.string().optional(),
});
exports.credentials = exports.userSchema.pick({ username: true, password: true });
exports.userUpdateSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    username: zod_1.z.string().optional(),
    mobileNumber: zod_1.z.string().optional(),
    email: zod_1.z.string().optional(),
    updatedBy: zod_1.z.string().optional(),
    // totalPoints: z.number().optional(),
});
exports.pointsEarnedSchema = zod_1.z.object({
    points: zod_1.z.number(),
    createdAt: zod_1.z.date().optional(),
});
exports.id = zod_1.z.object({
    id: zod_1.z.string(),
});
