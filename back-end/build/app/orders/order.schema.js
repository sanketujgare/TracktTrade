"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const base_schema_1 = require("../utility/base.schema");
const orderSchema = new base_schema_1.BaseSchema({
    distributorId: {
        type: mongoose_1.Types.ObjectId,
        required: true,
    },
    products: [
        {
            productId: {
                type: mongoose_1.Types.ObjectId,
                required: true,
            },
            quantity: {
                type: Number,
            },
        },
    ],
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending",
    },
});
const orderModel = (0, mongoose_1.model)("Order", orderSchema);
exports.default = orderModel;
