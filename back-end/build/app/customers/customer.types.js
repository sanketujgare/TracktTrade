"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchaseHistorySchema = exports.customerSchema = void 0;
const zod_1 = require("zod");
exports.customerSchema = zod_1.z.object({
    name: zod_1.z.string(),
    mobileNumber: zod_1.z.string(),
    email: zod_1.z.string(),
    purchaseHistory: zod_1.z.array(zod_1.z.object({
        salesId: zod_1.z.string(),
        createdAt: zod_1.z.date().optional(),
    })),
});
exports.purchaseHistorySchema = zod_1.z.object({ salesId: zod_1.z.string() });
