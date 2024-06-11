"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const base_schema_1 = require("../utility/base.schema");
const salesSchema = new base_schema_1.BaseSchema({
    distributorId: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: "User",
    },
    customerName: {
        type: String,
    },
    customerMobileNumber: {
        type: String,
        required: true,
    },
    customerEmail: {
        type: String,
    },
    products: [
        {
            productId: {
                type: mongoose_1.Types.ObjectId,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            currentPrice: {
                type: Number,
            },
        },
    ],
    totalPrice: {
        type: Number,
    },
});
const salesModel = (0, mongoose_1.model)("Sales", salesSchema);
exports.default = salesModel;
