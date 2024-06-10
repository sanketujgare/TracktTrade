import { model, Types } from "mongoose";
import { BaseSchema } from "../utility/base.schema";
import { IOrderSchema } from "./orders.types";

const orderSchema = new BaseSchema({
    distributorId: {
        type: Types.ObjectId,
        required: true,
    },
    products: [
        {
            productId: {
                type: Types.ObjectId,
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

const orderModel = model<IOrderSchema>("Order", orderSchema);
export default orderModel;
