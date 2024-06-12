"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusUpdate = exports.orderSchema = void 0;
const zod_1 = require("zod");
exports.orderSchema = zod_1.z.object({
    distributorId: zod_1.z.string(),
    products: zod_1.z.array(zod_1.z.object({
        productId: zod_1.z.string(),
        quantity: zod_1.z.number(),
    })),
    status: zod_1.z.enum(["pending", "completed"]),
});
exports.statusUpdate = zod_1.z.object({
    status: zod_1.z.enum(["pending", "completed"]),
});
