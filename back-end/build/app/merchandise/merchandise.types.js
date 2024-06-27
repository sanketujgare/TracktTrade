"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMerchandiseSchema = exports.id = exports.udpateRequestSchema = exports.redeemRequest = exports.redeemedSchema = exports.merchandiseSchema = void 0;
const zod_1 = require("zod");
exports.merchandiseSchema = zod_1.z.object({
    merchandiseName: zod_1.z.string().trim().min(1),
    merchandiseDescription: zod_1.z.string().trim().min(1),
    pointsRequired: zod_1.z.number().min(1),
    merchandiseImage: zod_1.z.string().trim().min(10),
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
exports.udpateRequestSchema = zod_1.z.object({
    userId: zod_1.z.string(),
    merchandiseId: zod_1.z.string(),
    status: zod_1.z.string(),
});
exports.id = zod_1.z.object({
    id: zod_1.z.string(),
});
exports.updateMerchandiseSchema = zod_1.z.object({
    merchandiseName: zod_1.z.string(),
    merchandiseDescription: zod_1.z.string(),
    pointsRequired: zod_1.z.number(),
    merchandiseImage: zod_1.z.string(),
    updatedBy: zod_1.z.string().optional(),
    updatedAt: zod_1.z.string().optional(),
});
