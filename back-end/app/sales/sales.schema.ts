import { model, Types } from "mongoose";
import { BaseSchema } from "../utility/base.schema";
import { ISalesSchema } from "./sales.types";

const salesSchema = new BaseSchema({
    distributorId: {
        type: Types.ObjectId,
        required: true,
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
        Type: Number,
    },
});
const salesModel = model<ISalesSchema>("Sales", salesSchema);
export default salesModel;
