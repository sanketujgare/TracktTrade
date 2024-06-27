"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.id = exports.updatedFields = exports.productSchema = void 0;
const zod_1 = require("zod");
exports.productSchema = zod_1.z.object({
    productName: zod_1.z.string().trim().min(1),
    productDescription: zod_1.z.string().trim().min(1),
    productPrice: zod_1.z.number().min(1),
    productImage: zod_1.z.string().trim().min(10),
    createdBy: zod_1.z.string().optional(),
    updatedBy: zod_1.z.string().optional(),
    isDeleted: zod_1.z.string().optional(),
    createdAt: zod_1.z.string().optional(),
    updatedAt: zod_1.z.string().optional(),
});
exports.updatedFields = zod_1.z.object({
    productName: zod_1.z.string().trim().min(1).optional(),
    productDescription: zod_1.z.string().trim().min(1).optional(),
    productPrice: zod_1.z.number().min(1).optional(),
    productImage: zod_1.z.string().trim().min(10).optional(),
    updatedBy: zod_1.z.string().optional(),
    updatedAt: zod_1.z.string().optional(),
});
exports.id = zod_1.z.object({
    id: zod_1.z.string(),
});
