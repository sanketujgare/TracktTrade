"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const base_schema_1 = require("../utility/base.schema");
const userSchema = new base_schema_1.BaseSchema({
    name: {
        type: String,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["Manufacturer", "Distributor"],
    },
    mobileNumber: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
    pointsEarned: [
        {
            points: {
                type: Number,
            },
            createdAt: {
                type: Date,
                default: Date.now(),
            },
        },
    ],
    totalPoints: {
        type: Number,
        default: 0,
    },
    inventory: [
        {
            productId: {
                type: mongoose_1.Types.ObjectId,
                required: true,
                ref: "Product",
            },
            quantity: {
                type: Number,
                default: 0,
            },
        },
    ],
    merchandiseRedeemed: [
        {
            merchandiseId: {
                type: mongoose_1.Types.ObjectId,
                ref: "Merchandise",
            },
            status: {
                type: String,
                enum: ["Pending", "Completed"],
            },
        },
    ],
});
const userModel = (0, mongoose_1.model)("User", userSchema);
exports.default = userModel;
