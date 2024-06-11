import { model, Schema, Types } from "mongoose";
import { BaseSchema } from "../utility/base.schema";
import { IUserSchema } from "./user.types";
import { string } from "zod";

const userSchema = new BaseSchema({
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
                type: Types.ObjectId,
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
                type: Types.ObjectId,
                ref: "Merchandise",
            },
            status: {
                type: String,
                enum: ["Pending", "Completed"],
            },
        },
    ],
});

const userModel = model<IUserSchema>("User", userSchema);
export default userModel;
