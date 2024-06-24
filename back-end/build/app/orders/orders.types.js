"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.id = exports.statusUpdate = exports.orderSchema = void 0;
const zod_1 = require("zod");
exports.orderSchema = zod_1.z.object({
    distributorId: zod_1.z.string(),
    products: zod_1.z.array(zod_1.z.object({
        productId: zod_1.z.string(),
        quantity: zod_1.z.number().min(1),
    })),
    status: zod_1.z.enum(["pending", "completed"]).optional(),
});
exports.statusUpdate = zod_1.z.object({
    status: zod_1.z.enum(["pending", "completed"]),
});
exports.id = zod_1.z.object({
    id: zod_1.z.string(),
});
