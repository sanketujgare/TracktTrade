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
        // required: true,
    },
    password: {
        type: String,
        // required: true,
    },
    role: {
        type: String,
        enum: ["Manufacturer", "Distributor", "Customer"],
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
    points: {
        type: Number,
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
    distributorSales: [
        {
            salesId: {
                type: mongoose_1.Types.ObjectId,
                ref: "Sales",
            },
        },
    ],
    customerPurchaceHistory: [
        {
            salesId: {
                type: mongoose_1.Types.ObjectId,
                ref: "Sales",
            },
        },
    ],
    rewardsRedeemed: [
        {
            rewardId: {
                type: mongoose_1.Types.ObjectId,
                ref: "Reward",
            },
        },
    ],
});
const userModel = (0, mongoose_1.model)("User", userSchema);
exports.default = userModel;
