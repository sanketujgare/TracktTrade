import { model, Types } from "mongoose";
import { BaseSchema } from "../utility/base.schema";
import { ISalesSchema } from "./sales.types";

const salesSchema = new BaseSchema({
    distributorId: {
        type: Types.ObjectId,
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
                type: Types.ObjectId,
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
const salesModel = model<ISalesSchema>("Sales", salesSchema);
export default salesModel;
