"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recordsPerPage = exports.credentials = exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string(),
    role: zod_1.z.enum(["Manufacturer", "Distributor", "Customer"]),
    mobileNumber: zod_1.z.string(),
    email: zod_1.z.string(),
    points: zod_1.z.number().optional(),
    inventory: zod_1.z
        .array(zod_1.z.object({
        productId: zod_1.z.string(),
        quantity: zod_1.z.number(),
    }))
        .optional(),
    distributorSales: zod_1.z
        .array(zod_1.z.object({
        salesId: zod_1.z.string(),
    }))
        .optional(),
    customerPurchaceHistory: zod_1.z
        .array(zod_1.z.object({
        salesId: zod_1.z.string(),
    }))
        .optional(),
    rewardsRedeemed: zod_1.z
        .array(zod_1.z.object({
        rewardId: zod_1.z.string(),
    }))
        .optional(),
});
exports.credentials = exports.userSchema.pick({ username: true, password: true });
exports.recordsPerPage = 5;