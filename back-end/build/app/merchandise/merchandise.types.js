"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.merchandiseSchema = void 0;
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
