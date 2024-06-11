"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerSchema = void 0;
const mongoose_1 = require("mongoose");
const base_schema_1 = require("../utility/base.schema");
exports.customerSchema = new base_schema_1.BaseSchema({
    name: {
        type: String,
    },
    mobileNumber: {
        type: String,
    },
    email: {
        type: String,
    },
    purchaseHistory: [
        {
            salesId: {
                type: String,
                ref: "Sale",
            },
            createdAt: {
                type: Date,
                default: Date.now(),
            },
        },
    ],
});
const customerModel = (0, mongoose_1.model)("Customer", exports.customerSchema);
exports.default = customerModel;
