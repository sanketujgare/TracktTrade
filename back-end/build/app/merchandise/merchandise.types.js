"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redeemRequest = exports.redeemedSchema = exports.merchandiseSchema = void 0;
const zod_1 = require("zod");
exports.merchandiseSchema = zod_1.z.object({
    merchandiseName: zod_1.z.string(),
    merchandiseDescription: zod_1.z.string(),
    pointsRequired: zod_1.z.number(),
    merchandiseImage: zod_1.z.string(),
    createdBy: zod_1.z.string().optional(),
    updatedBy: zod_1.z.string().optional(),
    isDeleted: zod_1.z.string().optional(),
    createdAt: zod_1.z.string().optional(),
    updatedAt: zod_1.z.string().optional(),
});
exports.redeemedSchema = zod_1.z.object({
    merchandiseId: zod_1.z.string(),
    status: zod_1.z.enum(["pending", "completed"]).optional(),
    createdAt: zod_1.z.date().optional(),
});
exports.redeemRequest = zod_1.z.object({
    merchandiseId: zod_1.z.string(),
    userId: zod_1.z.string(),
});
